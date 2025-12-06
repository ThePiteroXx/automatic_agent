import React, { useEffect, useRef } from 'react';
import type { Message, User } from '../types';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom of the list when new messages are added.
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {messages.map((msg) => (
        <div key={msg.id} className="animate-fade-in-up">
            <MessageBubble
              message={msg}
              isCurrentUser={msg.user.id === currentUser.id}
            />
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </>
  );
};

export default MessageList;