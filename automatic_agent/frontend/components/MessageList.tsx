import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 h-full scroll-smooth no-scrollbar">
      <div className="flex flex-col space-y-6 pb-4">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
        
        {isLoading && messages[messages.length - 1]?.role !== 'model' && (
            // Show typing indicator only if the last message wasn't already a streaming model message
            <div className="flex justify-start animate-fade-in">
                 <TypingIndicator />
            </div>
        )}
        
        {/* Spacer div for auto-scrolling */}
        <div ref={bottomRef} className="h-px" />
      </div>
    </div>
  );
};