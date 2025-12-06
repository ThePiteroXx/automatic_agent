import React from 'react';
import type { User } from '../types';
import { useChat } from '../hooks/useChat';
import Header from './Header';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

interface ChatScreenProps {
  user: User;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ user }) => {
  const { messages, isLoading, sendMessage } = useChat(user);

  return (
    <div className="flex flex-col h-full max-h-full">
      <Header user={user} />
      {/* Use a slightly different background for the message area to create depth */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 bg-zinc-800">
        <MessageList messages={messages} currentUser={user} />
        {isLoading && <TypingIndicator />}
      </div>
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatScreen;