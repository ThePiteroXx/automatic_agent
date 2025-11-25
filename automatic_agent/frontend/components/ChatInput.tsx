import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSend(text);
      setText('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="w-full relative mx-auto bg-slate-900/50 p-1 rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:border-brand-500/50 transition-all duration-300">
      <div className="flex items-end gap-2 p-1">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Lumina anything..."
          className="w-full bg-transparent text-slate-200 placeholder:text-slate-500 text-sm sm:text-base px-4 py-3 min-h-[48px] max-h-[120px] resize-none focus:outline-none scrollbar-hide"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || isLoading}
          className={`flex-none mb-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            text.trim() && !isLoading
              ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/25 scale-100'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed scale-95'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5 ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};