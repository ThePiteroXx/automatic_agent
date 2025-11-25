import { Resend } from "resend";

interface EmailConfig {
  to: string;
  subject: string;
  body: string;
  from?: string;
  html?: string;
}

export class EmailTool {
  private resend: Resend;
  private defaultFrom: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        "[EmailTool] Missing RESEND_API_KEY. Email sending will fail."
      );
    }
    this.resend = new Resend(apiKey);
    this.defaultFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
  }

  /**
   * Generates a simple email template
   * @param subject - Email subject
   * @param body - Email body (plain text)
   * @returns Email configuration object
   */
  generateEmail(subject: string, body: string): EmailConfig {
    return {
      to: "",
      subject,
      body,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">${subject}</h2>
            <div style="margin-top: 20px;">
              ${body
                .split("\n")
                .map((line) => `<p>${line}</p>`)
                .join("")}
            </div>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">
              This email was sent automatically. Please do not reply.
            </p>
          </div>
        </div>
      `,
    };
  }

  /**
   * Sends an email using Resend
   * @param config - Email configuration
   * @returns Success status and message ID
   */
  async sendEmail(config: EmailConfig): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    const { to, subject, body, from, html } = config;

    // Validation
    if (!to || !subject || !body) {
      return {
        success: false,
        error: "Missing required fields: to, subject, or body",
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

    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: "RESEND_API_KEY is not configured",
      };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: from || this.defaultFrom,
        to: [to],
        subject,
        text: body,
        html: html || body,
      });

      if (error) {
        console.error("Error sending email:", error);
        return {
          success: false,
          error: error.message,
        };
      }

      console.log("✅ Email sent successfully:", data?.id);

      return {
        success: true,
        messageId: data?.id,
      };
    } catch (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: `Failed to send email: ${error}`,
      };
    }
  }
}
