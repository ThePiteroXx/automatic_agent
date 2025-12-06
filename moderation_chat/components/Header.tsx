import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    // Redesigned header for a modern look with a subtle backdrop blur
    <header className="flex items-center justify-between p-4 bg-zinc-900/70 backdrop-blur-sm z-10 border-b border-zinc-700/50 flex-shrink-0 rounded-t-none sm:rounded-t-2xl">
      <h1 className="text-xl font-bold text-sky-400">Moderated Chat</h1>
      <div className="flex items-center space-x-2">
        <span className="text-zinc-400 text-sm">Welcome,</span>
        {/* Styled the nickname as a badge for better visual separation */}
        <span className="bg-sky-500/20 text-sky-300 text-sm font-semibold px-3 py-1 rounded-full">
          {user.nickname}
        </span>
      </div>
    </header>
  );
};

export default Header;