import type {
  ChatCompletion,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
} from "openai/resources/chat/completions";

import { OpenAIService } from "../OpenAIService";
import type { State } from "./AgentService.types";
import { TOOL_DEFINITIONS } from "./ToolDefinitions";

export interface Decision {
  toolName: string;
  parameters: any;
  reasoning?: string;
}

/**
 * DecisionEngine handles AI decision-making using OpenAI Function Calling
 * Separated from execution logic for clarity and testability
 */
export class DecisionEngine {
  private openaiService: OpenAIService;
  private state: State;

  constructor(state: State, openaiService: OpenAIService) {
    this.state = state;
    this.openaiService = openaiService;
  }

  /**
   * Analyze current context and decide the next action using OpenAI Function Calling
   */
  async analyzeAndPlan(): Promise<Decision | null> {
    const systemMessage = this.buildSystemMessage();
    const messages = [systemMessage, ...this.getRecentMessages()];

    try {
      const response = (await this.openaiService.completion({
        messages,
        model: "gpt-4o",
        stream: false,
        jsonMode: false,
        tools: TOOL_DEFINITIONS,
        tool_choice: "auto",
      })) as ChatCompletion;

      return this.extractDecisionFromResponse(response);
    } catch (error) {
      console.error("[DecisionEngine] Error analyzing and planning:", error);
      return null;
    }
  }

  /**
   * Build the system message that guides the AI's decision-making
   */
  private buildSystemMessage(): ChatCompletionMessageParam {
    const currentTime = new Date().toLocaleString("pl-PL", {
      timeZone: "Europe/Warsaw",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    return {
      role: "system",
      content: `You are an intelligent AI agent that analyzes conversations and determines the most appropriate next action.

<objective>
Determine the single most effective next action based on the current context, user needs, and progress toward the overall goal.
</objective>

<rules>
- DO NOT repeat the same action with same parameters multiple times - if an action was already executed successfully, use "final_answer" to inform the user
- ALWAYS focus on determining only the next immediate step
- CONSIDER the following factors when deciding:
  1. Relevance to the current user need or query
  2. Potential to provide valuable information or progress
  3. Logical flow from previous actions
- IF the best action is to invoke a tool that requires additional user-supplied parameters that you don't have, do NOT call that tool now. Instead, use "final_answer" to explicitly ask the user for the missing information.
- Each action should bring NEW information - if an action wouldn't add new value, use "final_answer" instead
- NEVER provide or assume actual content for actions not yet taken
</rules>

<context>
<current_time>${currentTime}</current_time>
<user_location>Poland (Europe/Warsaw timezone)</user_location>
<last_message>${this.state.messages[this.state.messages.length - 1]?.content || "No messages yet"}</last_message>
<actions_taken>
${this.formatActionsHistory()}
</actions_taken>
</context>

Choose the appropriate function to call based on the context and user needs.`,
    };
  }

  /**
   * Format the actions history for context
   */
  private formatActionsHistory(): string {
    if (this.state.actions.length === 0) {
      return "No actions taken yet";
    }

    return this.state.actions
      .map((action) => {
        const resultsText =
          action.results.length > 0
            ? action.results
                .map(
                  (result) => `
        <result name="${result.metadata.name}">
          ${result.text}
        </result>`
                )
                .join("\n")
            : "No results for this action";

        return `
    <action name="${action.name}" description="${action.description}" parameters="${action.parameters}">
      ${resultsText}
    </action>`;
      })
      .join("\n");
  }

  /**
   * Get recent messages for context (limit to avoid token overflow)
   */
  private getRecentMessages(): ChatCompletionMessageParam[] {
    const maxMessages = 5;
    return this.state.messages.slice(-maxMessages);
  }

  /**
   * Extract decision from OpenAI's function calling response
   */
  private extractDecisionFromResponse(
    response: ChatCompletion
  ): Decision | null {
    const message = response.choices[0]?.message;

    if (!message) {
      console.error("[DecisionEngine] No message in response");
      return null;
    }

    // Check for tool calls (function calling)
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      return this.parseToolCall(toolCall);
    }

    // If no tool call but has content, treat as final answer
    if (message.content) {
      return {
        toolName: "final_answer",
        parameters: { answer: message.content },
      };
    }

    console.error("[DecisionEngine] No tool call or content in response");
    return null;
  }

  /**
   * Parse a tool call into a Decision object
   */
  private parseToolCall(toolCall: ChatCompletionMessageToolCall): Decision {
    const functionName = toolCall.function.name;
    let parameters: any = {};

    try {
      parameters = JSON.parse(toolCall.function.arguments);
    } catch (error) {
      console.error(
        "[DecisionEngine] Error parsing function arguments:",
        error
      );
      parameters = { raw: toolCall.function.arguments };
    }

    return {
      toolName: functionName,
      parameters,
    };
  }

  /**
   * Get tool definitions for OpenAI function calling
   */
  static getToolDefinitions() {
    return TOOL_DEFINITIONS;
  }
}
