import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (email: string, nickname: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && nickname.trim()) {
      onLogin(email, nickname);
    } else {
      setError('Both fields are required.');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-zinc-800 p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-zinc-900 rounded-2xl shadow-xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-sky-400">Moderated Chat</h1>
            <p className="mt-2 text-zinc-400">Sign in to start chatting</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-zinc-300 block mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="nickname" className="text-sm font-medium text-zinc-300 block mb-2">
              Nickname
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              placeholder="Your Name"
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-zinc-900 transform active:scale-95"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;