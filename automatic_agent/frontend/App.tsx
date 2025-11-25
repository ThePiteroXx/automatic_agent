import React, { useState } from "react";
import { Header } from "./components/Header";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { Message, Role } from "./types";
import { AlertCircle } from "lucide-react";
import { chatService } from "./services/chatService";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: Role.MODEL,
      content:
        "Hello! I'm Lumina. I'm here to help you with your questions, schedule task, send emails. How can I assist you today?",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Call the backend API
      const response = await chatService.sendMessage(text);
      console.log(response);
      if (response.success && response.data?.message) {
        // Add the assistant's response to the messages
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: Role.MODEL,
          content: response.data.message,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(response.error || "Failed to get response from server");
      }
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-900/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-900/20 blur-[100px]" />
      </div>

      <Header />

      <main className="flex-1 overflow-hidden relative flex flex-col max-w-5xl mx-auto w-full w-full">
        <div className="flex-1 overflow-hidden relative">
          <MessageList messages={messages} isLoading={isLoading} />
        </div>

        {error && (
          <div className="px-4 py-2 mx-4 mb-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-200 text-sm animate-fade-in">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="p-4 pb-6">
          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
