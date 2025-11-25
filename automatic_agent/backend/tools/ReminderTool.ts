import * as cron from "node-cron";
import { EmailTool } from "./EmailTool";

interface ReminderConfig {
  to: string;
  subject: string;
  body: string;
  scheduledTime: string; // Cron format: "* * * * *" or ISO date string
  from?: string;
  html?: string;
  reminderId?: string;
}

interface ScheduledReminder {
  id: string;
  config: ReminderConfig;
  task: cron.ScheduledTask;
  scheduledAt: Date;
  status: "scheduled" | "sent" | "failed" | "cancelled";
}

export class ReminderTool {
  private emailTool: EmailTool;
  private reminders: Map<string, ScheduledReminder>;

  constructor() {
    this.emailTool = new EmailTool();
    this.reminders = new Map();
  }

  /**
   * Converts a date string to cron format
   * @param dateString - ISO date string or Date object
   * @returns Cron format string
   */
  private dateToCron(dateString: string | Date): string {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    // Cron format: minute hour day month dayOfWeek
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return `${minute} ${hour} ${day} ${month} *`;
  }

  /**
   * Validates if a string is a valid cron expression
   * @param cronExpression - Cron expression to validate
   * @returns Boolean indicating validity
   */
  private isValidCron(cronExpression: string): boolean {
    return cron.validate(cronExpression);
  }

  /**
   * Schedules a reminder email to be sent at a specific time
   * @param config - Reminder configuration
   * @returns Reminder ID and scheduling details
   */
  async scheduleReminder(config: ReminderConfig): Promise<{
    success: boolean;
    reminderId?: string;
    scheduledFor?: string;
    error?: string;
  }> {
    const { to, subject, body, scheduledTime, from, html } = config;

    // Validation
    if (!to || !subject || !body || !scheduledTime) {
      return {
        success: false,
        error: "Missing required fields: to, subject, body, or scheduledTime",
      };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return {
        success: false,
        error: "Invalid recipient email address",
      };
    }

    // Determine if scheduledTime is a cron expression or date string
    let cronExpression: string;
    let scheduledDate: Date;

    if (this.isValidCron(scheduledTime)) {
      cronExpression = scheduledTime;
      scheduledDate = new Date(); // Approximate, actual execution depends on cron
    } else {
      try {
        scheduledDate = new Date(scheduledTime);

        // Check if the date is in the future (using Polish timezone)
        const nowInPoland = new Date().toLocaleString("en-US", {
          timeZone: "Europe/Warsaw",
        });
        // Check if the date is in the past
        const currentTime = new Date(nowInPoland);

        if (scheduledDate < currentTime) {
          return {
            success: false,
            error: "Scheduled time must be in the future (Polish time)",
          };
        }

        cronExpression = this.dateToCron(scheduledDate);
      } catch (error) {
        return {
          success: false,
          error:
            "Invalid scheduledTime format. Use ISO date string or cron expression (e.g., '0 9 * * *')",
        };
      }
    }

    // Generate unique ID
    const reminderId =
      config.reminderId ||
      `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Create the cron task
      const task = cron.schedule(cronExpression, async () => {
        console.log(`🔔 Executing reminder: ${reminderId}`);

        const reminder = this.reminders.get(reminderId);
        if (!reminder) {
          console.error(`Reminder ${reminderId} not found`);
          return;
        }

        try {
          const result = await this.emailTool.sendEmail({
            to,
            subject,
            body,
            from,
            html,
          });

          if (result.success) {
            console.log(`✅ Reminder sent successfully: ${result.messageId}`);
            reminder.status = "sent";

            // Stop the task after sending (one-time reminder)
            if (!this.isValidCron(scheduledTime)) {
              task.stop();
            }
          } else {
            console.error(
              `❌ Failed to send reminder ${reminderId}:`,
              result.error
            );
            reminder.status = "failed";
          }
        } catch (error) {
          console.error(`❌ Error sending reminder ${reminderId}:`, error);
          reminder.status = "failed";
        }
      });

      // Store the reminder
      const reminder: ScheduledReminder = {
        id: reminderId,
        config,
        task,
        scheduledAt: scheduledDate,
        status: "scheduled",
      };

      this.reminders.set(reminderId, reminder);

      // Start the task
      task.start();

      console.log(
        `✅ Reminder scheduled: ${reminderId} for ${scheduledDate.toISOString()}`
      );

      return {
        success: true,
        reminderId,
        scheduledFor: scheduledDate.toISOString(),
      };
    } catch (error) {
      console.error("Error scheduling reminder:", error);
      return {
        success: false,
        error: `Failed to schedule reminder: ${error}`,
      };
    }
  }

  /**
   * Cancels a scheduled reminder
   * @param reminderId - ID of the reminder to cancel
   * @returns Success status
   */
  cancelReminder(reminderId: string): {
    success: boolean;
    error?: string;
  } {
    const reminder = this.reminders.get(reminderId);

    if (!reminder) {
      return {
        success: false,
        error: `Reminder ${reminderId} not found`,
      };
    }

    try {
      reminder.task.stop();
      reminder.status = "cancelled";
      this.reminders.delete(reminderId);

      console.log(`🚫 Reminder cancelled: ${reminderId}`);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to cancel reminder: ${error}`,
      };
    }
  }

  /**
   * Gets the status of a reminder
   * @param reminderId - ID of the reminder
   * @returns Reminder details
   */
  getReminderStatus(reminderId: string): {
    success: boolean;
    reminder?: {
      id: string;
      to: string;
      subject: string;
      scheduledAt: string;
      status: string;
    };
    error?: string;
  } {
    const reminder = this.reminders.get(reminderId);

    if (!reminder) {
      return {
        success: false,
        error: `Reminder ${reminderId} not found`,
      };
    }

    return {
      success: true,
      reminder: {
        id: reminder.id,
        to: reminder.config.to,
        subject: reminder.config.subject,
        scheduledAt: reminder.scheduledAt.toISOString(),
        status: reminder.status,
      },
    };
  }

  /**
   * Lists all scheduled reminders
   * @returns Array of reminder details
   */
  listReminders(): Array<{
    id: string;
    to: string;
    subject: string;
    scheduledAt: string;
    status: string;
  }> {
    return Array.from(this.reminders.values()).map((reminder) => ({
      id: reminder.id,
      to: reminder.config.to,
      subject: reminder.config.subject,
      scheduledAt: reminder.scheduledAt.toISOString(),
      status: reminder.status,
    }));
  }
}
