import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isCurrentUser }) => {
  // Determine alignment and color scheme based on whether the message is from the current user.
  const alignment = isCurrentUser ? 'justify-end' : 'justify-start';
  
  // User messages get a distinct gradient background.
  const bubbleColor = isCurrentUser 
    ? 'bg-gradient-to-br from-sky-500 to-sky-600' 
    : 'bg-zinc-700';
  
  const textColor = 'text-white';
  
  // Softer, more modern rounded corners.
  const borderRadius = isCurrentUser 
    ? 'rounded-2xl rounded-br-md' 
    : 'rounded-2xl rounded-bl-md';

  // Format timestamp to a readable time string (e.g., 10:30 AM)
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex ${alignment} w-full`}>
      <div className="flex flex-col max-w-xs md:max-w-md lg:max-w-lg">
        {/* Nickname is now displayed above the bubble for clarity */}
        <div className={`text-xs text-zinc-400 mb-1 px-2 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
            {message.user.nickname}
        </div>
        <div className={`px-4 py-3 ${bubbleColor} ${textColor} ${borderRadius} shadow-lg`}>
            {/* Improved typography for readability */}
            <p className="text-base break-words font-normal leading-relaxed">{message.text}</p>
        </div>
        {/* Timestamp is more subtle and placed below the bubble */}
        <div className={`text-xs text-zinc-500 mt-1.5 px-2 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
            {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;