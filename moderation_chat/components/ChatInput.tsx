import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const SendIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    // Added a slight border and background color to distinguish the input area
    <div className="p-4 bg-zinc-900/70 border-t border-zinc-700/50 flex-shrink-0 rounded-b-none sm:rounded-b-2xl">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow w-full px-5 py-3 bg-zinc-800 border border-zinc-700 rounded-full focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-300"
          disabled={isLoading}
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-full bg-sky-600 text-white hover:bg-sky-700 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-zinc-900 transform active:scale-90"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;