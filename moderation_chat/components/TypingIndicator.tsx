import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    // Redesigned to be more subtle and in-line with the new message bubble style
    <div className="flex justify-start w-full animate-fade-in-up">
        <div className="flex items-center space-x-2.5 px-4 py-3 bg-zinc-700 rounded-2xl rounded-bl-md shadow-md">
            <span className="text-base text-zinc-300 font-normal">Analyzing</span>
            {/* Modernized bouncing dots animation */}
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
    </div>
  );
};

export default TypingIndicator;