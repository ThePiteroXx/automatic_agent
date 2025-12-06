import { useState, useCallback } from 'react';
import type { Message, User } from '../types';
import { moderateMessage } from '../services/openAIService';

// Predefined AI user for moderator messages.
const MODERATOR_USER: User = {
  id: 'moderator_1',
  nickname: 'Moderator',
  email: 'moderator@system.ai',
};

// Initial welcome message from the moderator.
const initialMessages: Message[] = [
  {
    id: `msg_${Date.now()}`,
    text: "Hello! This is a moderated chat. Please keep the conversation respectful and follow our community guidelines.",
    timestamp: Date.now(),
    user: MODERATOR_USER,
  },
];

/**
 * Custom hook to manage all chat logic.
 * @param currentUser The currently logged-in user.
 * @returns An object with messages, loading state, and the sendMessage function.
 */
export const useChat = (currentUser: User) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Sends a message from the current user after moderating it.
   * This function is memoized with useCallback for performance.
   */
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);

    try {
      const moderationResult = await moderateMessage(text);
      
      if (moderationResult === 'CLEAN') {
        // If the message is clean, add it to the chat.
        const userMessage: Message = {
          id: `msg_${Date.now()}`,
          text,
          timestamp: Date.now(),
          user: currentUser,
        };
        setMessages((prev) => [...prev, userMessage]);
      } else {
        // If the message is offensive, block it and notify the user.
        const moderatorWarning: Message = {
          id: `mod_${Date.now()}`,
          text: "Your previous message was blocked for containing inappropriate content.",
          timestamp: Date.now(),
          user: MODERATOR_USER,
        };
        setMessages((prev) => [...prev, moderatorWarning]);
      }

    } catch (error) {
      console.error('Failed to moderate message:', error);
      // Optionally add a generic error message to the chat.
       const errorMessage: Message = {
        id: `err_${Date.now()}`,
        text: "Sorry, something went wrong while sending your message. Please try again.",
        timestamp: Date.now(),
        user: MODERATOR_USER,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Reset loading state.
      setIsLoading(false);
    }
  }, [currentUser]);

  return { messages, isLoading, sendMessage };
};
