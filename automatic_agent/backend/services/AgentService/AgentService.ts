import type {
  ChatCompletion,
  ChatCompletionMessageParam,
} from "openai/resources/chat/completions";

import { OpenAIService } from "../OpenAIService";
import type { State } from "./AgentService.types";
import { ToolExecutor } from "./ToolExecutor";
import { DecisionEngine } from "./DecisionEngine";

/**
 * AgentService orchestrates the AI agent's workflow
 * Delegates decision-making to DecisionEngine and execution to ToolExecutor
 */
export class AgentService {
  private openaiService: OpenAIService;
  private state: State;
  private toolExecutor: ToolExecutor;
  private decisionEngine: DecisionEngine;

  constructor(state: State) {
    this.openaiService = new OpenAIService();
    this.state = state;
    this.toolExecutor = new ToolExecutor(state);
    this.decisionEngine = new DecisionEngine(this.state, this.openaiService);
  }

  async executeTool(toolName: string, parameters: any): Promise<any> {
    return await this.toolExecutor.execute(toolName, parameters);
  }

  /**
   * Main agent loop that orchestrates decision-making and execution
   */
  async runAgentLoop(): Promise<{
    success: boolean;
    result?: any;
    error?: string;
  }> {
    try {
      while (this.state.config.current_step < this.state.config.max_steps) {
        // Use DecisionEngine to analyze and decide next action
        const decision = await this.decisionEngine.analyzeAndPlan();

        if (!decision) {
          return {
            success: false,
            error: "Failed to get decision from AI",
          };
        }

        console.log(`[AgentService] Decision:`, decision);

        // Execute the chosen tool
        const toolResult = await this.executeTool(
          decision.toolName,
          decision.parameters
        );

        // Check if it's a final answer
        if (toolResult.type === "final_answer") {
          this.state.config.current_step = 0;
          return {
            success: true,
            result: {
              output: toolResult.answer,
              actions: this.state.actions,
            },
          };
        }

        // Add result to state messages for context in next iteration
        this.state.messages.push({
          role: "assistant",
          content: `Tool ${decision.toolName} executed: ${JSON.stringify(toolResult)}`,
        });

        this.state.config.current_step++;
      }

      return {
        success: false,
        error: "Max steps reached without final answer",
      };
    } catch (error) {
      console.error("[AgentService] Error in agent loop:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
