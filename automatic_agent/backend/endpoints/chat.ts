import { Router, type Request, type Response } from "express";
import { AgentService } from "../services/AgentService/AgentService";
import type { State } from "../services/AgentService/AgentService.types";

const router = Router();

// Global conversation state
const globalState: State = {
  messages: [],
  tools: [],
  documents: [],
  actions: [],
  config: {
    max_steps: 6,
    current_step: 0,
    active_step: null,
  },
};

/**
 * POST /chat
 * Main chat endpoint with persistent conversation state
 *
 * Request body:
 * - message: string (required) - The user message
 *
 * Response:
 * - success: boolean
 * - data: { message: string, tokens: { prompt, completion, total }, state: State }
 * - error: string (if error occurred)
 */
router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    console.log("[POST /chat] Processing message:", message);

    // Add user message to global state
    globalState.messages.push({
      role: "user",
      content: message,
    });

    // Increment step counter
    globalState.config.current_step++;

    // Create agent instance with global state
    const agentService = new AgentService(globalState);

    // Run the agent loop instead of simple workflow
    const result = await agentService.runAgentLoop();
    console.log(result);
    if (result.success) {
      // Add assistant response to global state
      if (result.result?.output) {
        globalState.messages.push({
          role: "assistant",
          content: result.result.output,
        });
      }

      return res.json({
        success: true,
        data: {
          message: result.result?.output,
          tokens: result.result?.tokens,
          state: {
            messageCount: globalState.messages.length,
            currentStep: globalState.config.current_step,
            actionsCount: globalState.actions.length,
            documentsCount: globalState.documents.length,
          },
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    console.error("[POST /chat] Error:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

/**
 * POST /chat/reset
 * Reset the conversation state
 *
 * Response:
 * - success: boolean
 * - message: string
 */
router.post("/chat/reset", (req: Request, res: Response) => {
  console.log("[POST /chat/reset] Resetting conversation state");

  // Reset global state
  globalState.messages = [];
  globalState.tools = [];
  globalState.documents = [];
  globalState.actions = [];
  globalState.config.current_step = 0;
  globalState.config.active_step = null;

  res.json({
    success: true,
    message: "Conversation state has been reset",
  });
});

/**
 * GET /chat/state
 * Get current conversation state information
 *
 * Response:
 * - success: boolean
 * - data: State summary
 */
router.get("/chat/state", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      messageCount: globalState.messages.length,
      messages: globalState.messages,
      currentStep: globalState.config.current_step,
      maxSteps: globalState.config.max_steps,
      actionsCount: globalState.actions.length,
      documentsCount: globalState.documents.length,
      toolsCount: globalState.tools.length,
    },
  });
});

export default router;
