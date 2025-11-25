import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-4 animate-fade-in">
       {/* Avatar representation */}
       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/20 opacity-50">
           <div className="w-2 h-2 bg-white rounded-full animate-ping" />
       </div>
       
       {/* Bubble */}
       <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 h-[46px]">
          <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></div>
       </div>
    </div>
  );
};