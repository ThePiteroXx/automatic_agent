import React from 'react';
import type { User } from './types';
import ChatScreen from './components/ChatScreen';

// Default user for the chat session, as login is removed.
const defaultUser: User = {
  id: `user_local_${Date.now()}`,
  email: 'user@example.com',
  nickname: 'You',
};

const App: React.FC = () => {
  return (
    // Switched to a warmer gray (zinc) for the background
    // Centering the main chat container for better layout on larger screens
    <div className="bg-zinc-900 text-white min-h-screen font-sans flex items-center justify-center p-0 sm:p-4">
       <div className="w-full h-full sm:max-w-4xl sm:h-[95vh] bg-zinc-800 rounded-none sm:rounded-2xl shadow-2xl flex flex-col">
          <ChatScreen user={defaultUser} />
       </div>
    </div>
  );
};

export default App;