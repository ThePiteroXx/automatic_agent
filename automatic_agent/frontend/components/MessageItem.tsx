import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div 
      className={`group flex w-full gap-4 animate-slide-up ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-slate-700 text-slate-200' 
            : 'bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/20'
        }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-2 mb-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                {isUser ? 'You' : 'Lumina'}
            </span>
        </div>

        <div 
          className={`relative px-5 py-3.5 rounded-2xl text-sm sm:text-base leading-relaxed shadow-sm overflow-hidden ${
            isUser
              ? 'bg-slate-800 text-slate-100 rounded-tr-none border border-slate-700'
              : 'bg-white/5 backdrop-blur-sm text-slate-200 rounded-tl-none border border-white/10'
          }`}
        >
          {/* Markdown Rendering */}
          <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-white/10 prose-code:text-brand-300 prose-a:text-brand-400 hover:prose-a:text-brand-300">
            <ReactMarkdown
                components={{
                    code({node, inline, className, children, ...props}: any) {
                        return !inline ? (
                            <div className="rounded-lg bg-slate-950/50 border border-white/5 overflow-hidden my-2">
                                <div className="px-3 py-1 bg-white/5 border-b border-white/5 text-[10px] text-slate-400 font-mono">
                                    Code
                                </div>
                                <code className={`block p-3 overflow-x-auto font-mono text-xs sm:text-sm ${className}`} {...props}>
                                    {children}
                                </code>
                            </div>
                        ) : (
                            <code className="bg-white/10 rounded px-1 py-0.5 font-mono text-[0.9em] text-brand-200" {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};