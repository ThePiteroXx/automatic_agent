import { EmailTool } from "../../tools/EmailTool";
import { ReminderTool } from "../../tools/ReminderTool";
import { WeatherTool } from "../../tools/WeatherTool";
import { FinalAnswerTool } from "../../tools/FinalAnswerTool";
import { v4 as uuidv4 } from "uuid";
import type { State } from "./AgentService.types";

/**
 * ToolExecutor handles the execution of tools
 */
export class ToolExecutor {
  private emailTool: EmailTool;
  private reminderTool: ReminderTool;
  private weatherTool: WeatherTool;
  private finalAnswerTool: FinalAnswerTool;
  private state: State;

  constructor(state: State) {
    this.state = state;
    this.emailTool = new EmailTool();
    this.reminderTool = new ReminderTool();
    this.weatherTool = new WeatherTool();
    this.finalAnswerTool = new FinalAnswerTool();
  }

  /**
   * Execute a tool by name with the given parameters
   */
  async execute(toolName: string, parameters: any): Promise<any> {
    console.log(`[ToolExecutor] Executing tool: ${toolName}`, parameters);

    switch (toolName) {
      case "send_email":
        return await this.executeSendEmail(parameters);

      case "schedule_reminder":
        return await this.executeScheduleReminder(parameters);

      case "check_weather":
        return await this.executeCheckWeather(parameters);

      case "final_answer":
        return await this.executeFinalAnswer(parameters);

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  /**
   * Execute send_email tool
   */
  private async executeSendEmail(parameters: {
    subject: string;
    to: string;
    body: string;
  }) {
    const { subject, body, to } = parameters;

    const emailConfig = this.emailTool.generateEmail(subject, body);
    emailConfig.to = to;
    const result = await this.emailTool.sendEmail(emailConfig);

    if (result.success) {
      this.state.actions.push({
        uuid: uuidv4(),
        name: "send_email",
        parameters: JSON.stringify(parameters),
        description: `Sent email to ${to}`,
        results: [
          {
            text: JSON.stringify(result),
            metadata: {
              tokens: 0,
              type: "text",
              content_type: "complete",
              name: "email_result",
            },
          },
        ],
      });
    }
    return result;
  }

  /**
   * Execute schedule_reminder tool
   */
  private async executeScheduleReminder(parameters: {
    subject: string;
    to: string;
    body: string;
    scheduledTime: string;
  }) {
    const { subject, body, to, scheduledTime } = parameters;

    const reminderResult = await this.reminderTool.scheduleReminder({
      to,
      subject,
      body,
      scheduledTime,
    });

    if (reminderResult.success) {
      this.state.actions.push({
        uuid: uuidv4(),
        name: "schedule_reminder",
        parameters: JSON.stringify(parameters),
        description: `Scheduled reminder for ${to} at ${reminderResult.scheduledFor}`,
        results: [
          {
            text: JSON.stringify(reminderResult),
            metadata: {
              tokens: 0,
              type: "text",
              content_type: "complete",
              name: "reminder_result",
            },
          },
        ],
      });
    }
    return reminderResult;
  }

  /**
   * Execute check_weather tool
   */
  private async executeCheckWeather(parameters: {
    city: string;
    countryCode?: string;
  }) {
    const { city, countryCode } = parameters;

    const weatherResult = await this.weatherTool.getWeather(city);

    let resultText: string;
    if (weatherResult.success && weatherResult.data) {
      resultText = this.weatherTool.formatWeather(weatherResult.data);
    } else {
      resultText = `Failed to get weather: ${weatherResult.error}`;
    }

    if (weatherResult.success) {
      this.state.actions.push({
        uuid: uuidv4(),
        name: "check_weather",
        parameters: JSON.stringify(parameters),
        description: `Checked weather for ${city}${countryCode ? `, ${countryCode}` : ""}`,
        results: [
          {
            text: resultText,
            metadata: {
              tokens: 0,
              type: "text",
              content_type: "complete",
              name: "weather_result",
            },
          },
        ],
      });
    }

    return weatherResult;
  }

  /**
   * Execute final_answer tool
   * Formats the answer through LLM to make it user-friendly
   */
  private async executeFinalAnswer(parameters: { answer: string }) {
    const { answer } = parameters;

    // Get user's original query from conversation history
    const userQuery = this.state.messages.find((msg) => msg.role === "user")
      ?.content as string | undefined;

    // Collect context from previous actions
    const context = this.state.actions
      .map((action) => {
        const results = action.results.map((r) => r.text).join("\n");
        return `${action.description}: ${results}`;
      })
      .join("\n");

    const formattedResult = await this.finalAnswerTool.formatAnswer({
      rawAnswer: answer,
      context: context || undefined,
      userQuery: userQuery || undefined,
    });

    if (formattedResult.success && formattedResult.formattedAnswer) {
      this.state.actions.push({
        uuid: uuidv4(),
        name: "final_answer",
        parameters: JSON.stringify(parameters),
        description: "Formatted final answer for user",
        results: [
          {
            text: formattedResult.formattedAnswer,
            metadata: {
              tokens: 0,
              type: "text",
              content_type: "complete",
              name: "final_answer",
            },
          },
        ],
      });

      return {
        type: "final_answer",
        answer: formattedResult.formattedAnswer,
      };
    }

    // Fallback to raw answer if formatting fails
    console.warn(
      "[ToolExecutor] Failed to format answer, using raw answer:",
      formattedResult.error
    );
    return {
      type: "final_answer",
      answer: answer,
    };
  }
}
