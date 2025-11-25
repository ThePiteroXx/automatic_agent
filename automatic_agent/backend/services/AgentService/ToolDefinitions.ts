import type { ChatCompletionTool } from "openai/resources/chat/completions";

/**
 * OpenAI Function Calling tool definitions
 * Each tool is defined according to the OpenAI function calling schema
 */
export const TOOL_DEFINITIONS: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "send_email",
      description: "Send an email to a recipient",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "Recipient email address",
          },
          subject: {
            type: "string",
            description: "Subject of the email",
          },
          body: {
            type: "string",
            description: "Body text of the email",
          },
        },
        required: ["to", "subject", "body"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "schedule_reminder",
      description: "Schedule an email reminder to be sent at a specific time",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "Recipient email address",
          },
          subject: {
            type: "string",
            description: "Subject of the reminder email",
          },
          body: {
            type: "string",
            description: "Body text of the reminder email",
          },
          scheduledTime: {
            type: "string",
            description:
              "When to send the reminder - ISO date string (e.g., '2024-12-25T09:00:00') or cron expression (e.g., '0 9 * * *')",
          },
        },
        required: ["to", "subject", "body", "scheduledTime"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_weather",
      description:
        "Check current weather conditions for a specific city. Returns temperature, humidity, wind speed, and weather description.",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description:
              "Name of the city to check weather for (e.g., 'Warsaw', 'London', 'New York')",
          },
          countryCode: {
            type: "string",
            description:
              "Optional ISO 3166 country code for more precise location (e.g., 'pl', 'gb', 'us')",
          },
        },
        required: ["city"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "final_answer",
      description:
        "Use this tool when you have all necessary information to answer the user's question. The answer will be automatically formatted to be clear and user-friendly, hiding technical implementation details.",
      parameters: {
        type: "object",
        properties: {
          answer: {
            type: "string",
            description:
              "Your answer to the user. Include all relevant information gathered from previous tools and actions. The answer will be reformatted to be more user-friendly.",
          },
        },
        required: ["answer"],
      },
    },
  },
];
