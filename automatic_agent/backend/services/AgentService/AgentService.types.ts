import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export interface IDoc {
  text: string;
  metadata: {
    tokens: number;
    type: "audio" | "text" | "image" | "document";
    content_type: "chunk" | "complete";
    source?: string;
    mimeType?: string;
    name?: string;
    description?: string;
    source_uuid?: string;
    conversation_uuid?: string;
    uuid?: string;
    duration?: number;
    headers?: Headers;
    urls?: string[];
    images?: string[];
    screenshots?: string[];
    chunk_index?: number;
    total_chunks?: number;
  };
}

export interface Tool {
  uuid: string;
  name: string;
  description: string;
  instruction: string;
  parameters: string;
}

export interface Action {
  uuid: string;
  name: string;
  parameters: string;
  description: string;
  results: IDoc[];
}

export interface Step {
  name: string;
  query: string;
}

export interface State {
  messages: ChatCompletionMessageParam[];
  tools: Tool[];
  documents: IDoc[];
  actions: Action[];
  config: {
    max_steps: number;
    current_step: number;
    current_tool?: Tool;
    active_step?: Step | null;
  };
}
