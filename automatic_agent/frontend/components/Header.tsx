import React from 'react';
import { Sparkles, Github } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex-none h-16 px-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <h1 className="font-bold text-xl tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Lumina
          </span>
        </h1>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
            Beta
        </span>
      </div>
      
      <div className="flex items-center gap-4">
         <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online
         </a>
      </div>
    </header>
  );
};