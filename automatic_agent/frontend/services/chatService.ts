const API_BASE_URL = "http://localhost:4000";

interface ChatResponse {
  success: boolean;
  data?: {
    message: string;
    tokens?: {
      prompt: number;
      completion: number;
      total: number;
    };
    state?: {
      messageCount: number;
      currentStep: number;
      actionsCount: number;
      documentsCount: number;
    };
  };
  error?: string;
}

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },
};
