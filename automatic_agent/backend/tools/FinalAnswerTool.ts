import { OpenAIService } from "../services/OpenAIService";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

interface FinalAnswerConfig {
  rawAnswer: string;
  context?: string;
  userQuery?: string;
}

export class FinalAnswerTool {
  private openaiService: OpenAIService;

  constructor() {
    this.openaiService = new OpenAIService();
  }

  /**
   * Processes the raw answer/context through LLM to create a user-friendly response
   * without revealing implementation details
   */
  async formatAnswer(config: FinalAnswerConfig): Promise<{
    success: boolean;
    formattedAnswer?: string;
    error?: string;
  }> {
    const { rawAnswer, context, userQuery } = config;

    if (!rawAnswer) {
      return {
        success: false,
        error: "Missing raw answer to format",
      };
    }

    try {
      const systemPrompt = `
      From now on, you're asist AI using the fewest words possible while maintaining clarity and completeness. 
      <objective>
Transform technical system outputs and raw results into clear, user-friendly responses that hide implementation details and focus on what matters to the user.
</objective>

<rules>
- NEVER reveal technical implementation details (function names, data structures, error codes, system internals)
- Focus exclusively on outcomes and information relevant to the user
- Present results in a natural, conversational, and helpful manner
- When something succeeded: clearly explain what was accomplished
- When something failed: explain the issue in simple, non-technical terms
- Always respond in Polish language
- Be concise yet complete in conveying information
- Maintain a friendly and professional tone
- If multiple actions were performed, present them in a logical sequence
- Avoid jargon, abbreviations, or technical terminology
</rules>

<context>
You are acting as the final interface layer between an automated agent system and the end user. Your role is to translate raw system outputs into polished, human-friendly responses.
</context>`;

      const userPrompt = `${userQuery ? `User's question: ${userQuery}\n\n` : ""}System output:\n${rawAnswer}${context ? `\n\nAdditional context:\n${context}` : ""}

Transform the above information into a user-friendly response in Polish.`;

      const messages: ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ];

      const response = await this.openaiService.completion({
        messages,
        model: "gpt-4o-mini",
        maxTokens: 500,
      });

      if ("choices" in response && response.choices[0]?.message?.content) {
        const formattedAnswer = response.choices[0].message.content.trim();

        console.log("✅ Answer formatted successfully");

        return {
          success: true,
          formattedAnswer,
        };
      }

      return {
        success: false,
        error: "Failed to format answer - no response from LLM",
      };
    } catch (error) {
      console.error("Error formatting answer:", error);
      return {
        success: false,
        error: `Failed to format answer: ${error}`,
      };
    }
  }
}
