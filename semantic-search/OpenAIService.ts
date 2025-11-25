import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import type { CreateEmbeddingResponse } from "openai/resources/embeddings";
import { createByModelName } from "@microsoft/tiktokenizer";

export class OpenAIService {
  private openai: OpenAI;
  private tokenizers: Map<
    string,
    Awaited<ReturnType<typeof createByModelName>>
  > = new Map();
  private readonly IM_START = "<|im_start|>";
  private readonly IM_END = "<|im_end|>";
  private readonly IM_SEP = "<|im_sep|>";
  private readonly JINA_API_KEY = process.env.JINA_API_KEY;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    } else {
      // Create a dummy object to avoid undefined checks; methods using openai will guard
      this.openai = new OpenAI({ apiKey: "DUMMY_KEY" });
      console.warn(
        "[OpenAIService] Missing OPENAI_API_KEY. Will fallback to Jina embeddings and disable OpenAI chat features."
      );
    }
  }

  private async getTokenizer(modelName: string) {
    if (!this.tokenizers.has(modelName)) {
      const specialTokens: ReadonlyMap<string, number> = new Map([
        [this.IM_START, 100264],
        [this.IM_END, 100265],
        [this.IM_SEP, 100266],
      ]);
      const tokenizer = await createByModelName(modelName, specialTokens);
      this.tokenizers.set(modelName, tokenizer);
    }
    return this.tokenizers.get(modelName)!;
  }

  async countTokens(
    messages: ChatCompletionMessageParam[],
    model: string = "gpt-4o"
  ): Promise<number> {
    const tokenizer = await this.getTokenizer(model);

    let formattedContent = "";
    messages.forEach((message) => {
      formattedContent += `${this.IM_START}${message.role}${this.IM_SEP}${message.content || ""}${this.IM_END}`;
    });
    formattedContent += `${this.IM_START}assistant${this.IM_SEP}`;

    const tokens = tokenizer.encode(formattedContent, [
      this.IM_START,
      this.IM_END,
      this.IM_SEP,
    ]);
    return tokens.length;
  }

  async createEmbedding(text: string): Promise<number[]> {
    // We standardize all embeddings to 1024 dimensions to match the Qdrant collection setup.
    // OpenAI's text-embedding-3-large returns 3072 dims, so we truncate.
    // If a provider returns fewer than 1024 dims we pad with zeros to keep consistency.
    const TARGET_DIM = 1024;
    if (!process.env.OPENAI_API_KEY) {
      console.log(
        "[OpenAIService] OPENAI_API_KEY missing – using Jina embedding fallback."
      );
      // Fallback to Jina embedding if OpenAI key missing
      return this.createJinaEmbedding(text);
    }
    try {
      const response: CreateEmbeddingResponse =
        await this.openai.embeddings.create({
          model: "text-embedding-3-large",
          input: text,
        });
      let embed = response.data[0].embedding;
      if (embed.length > TARGET_DIM) {
        embed = embed.slice(0, TARGET_DIM);
      } else if (embed.length < TARGET_DIM) {
        embed = [...embed, ...new Array(TARGET_DIM - embed.length).fill(0)];
      }
      return embed;
    } catch (error) {
      console.error(
        "Error creating embedding, attempting Jina fallback:",
        error
      );
      const jina = await this.createJinaEmbedding(text);
      // Ensure size conformity (Jina configured for 1024, but safeguard anyway)
      if (jina.length < TARGET_DIM) {
        return [...jina, ...new Array(TARGET_DIM - jina.length).fill(0)];
      } else if (jina.length > TARGET_DIM) {
        return jina.slice(0, TARGET_DIM);
      }
      return jina;
    }
  }

  async createJinaEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch("https://api.jina.ai/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.JINA_API_KEY}`,
        },
        body: JSON.stringify({
          model: "jina-embeddings-v3",
          task: "text-matching",
          dimensions: 1024,
          late_chunking: false,
          embedding_type: "float",
          input: [text],
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const TARGET_DIM = 1024;
      let embed = data.data[0].embedding;
      if (embed.length > TARGET_DIM) {
        embed = embed.slice(0, TARGET_DIM);
      } else if (embed.length < TARGET_DIM) {
        embed = [...embed, ...new Array(TARGET_DIM - embed.length).fill(0)];
      }
      return embed;
    } catch (error) {
      console.error("Error creating Jina embedding:", error);
      throw error;
    }
  }

  async completion(config: {
    messages: ChatCompletionMessageParam[];
    model?: string;
    stream?: boolean;
    jsonMode?: boolean;
    maxTokens?: number;
  }): Promise<
    | OpenAI.Chat.Completions.ChatCompletion
    | AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>
  > {
    const {
      messages,
      model = "gpt-4o",
      stream = false,
      jsonMode = false,
      maxTokens = 4096,
    } = config;
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY missing: completion unavailable. Provide key or modify calling code to skip LLM answer generation."
      );
    }
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages,
        model,
        ...(model !== "o1-mini" &&
          model !== "o1-preview" && {
            stream,
            max_tokens: maxTokens,
            response_format: jsonMode
              ? { type: "json_object" }
              : { type: "text" },
          }),
      });
      return stream
        ? (chatCompletion as AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>)
        : (chatCompletion as OpenAI.Chat.Completions.ChatCompletion);
    } catch (error) {
      console.error("Error in OpenAI completion:", error);
      throw error;
    }
  }

  async calculateImageTokens(
    width: number,
    height: number,
    detail: "low" | "high"
  ): Promise<number> {
    let tokenCost = 0;

    if (detail === "low") {
      tokenCost += 85;
      return tokenCost;
    }

    const MAX_DIMENSION = 2048;
    const SCALE_SIZE = 768;

    // Resize to fit within MAX_DIMENSION x MAX_DIMENSION
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      const aspectRatio = width / height;
      if (aspectRatio > 1) {
        width = MAX_DIMENSION;
        height = Math.round(MAX_DIMENSION / aspectRatio);
      } else {
        height = MAX_DIMENSION;
        width = Math.round(MAX_DIMENSION * aspectRatio);
      }
    }

    // Scale the shortest side to SCALE_SIZE
    if (width >= height && height > SCALE_SIZE) {
      width = Math.round((SCALE_SIZE / height) * width);
      height = SCALE_SIZE;
    } else if (height > width && width > SCALE_SIZE) {
      height = Math.round((SCALE_SIZE / width) * height);
      width = SCALE_SIZE;
    }

    // Calculate the number of 512px squares
    const numSquares = Math.ceil(width / 512) * Math.ceil(height / 512);

    // Calculate the token cost
    tokenCost += numSquares * 170 + 85;

    return tokenCost;
  }
}
