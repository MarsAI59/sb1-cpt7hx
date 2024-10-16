import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler une connexion
    const user: User = { id: '1', username: email.split('@')[0], email };
    onLogin(user);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">QRuiz</h2>
      <h3 className="text-xl font-semibold text-center mb-6">Se connecter</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mot de passe"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          VALIDER
        </button>
      </form>
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-blue-500 hover:underline">S'inscrire</a>
      </div>
      <div className="mt-2 text-center">
        <a href="#" className="text-sm text-gray-500 hover:underline">Mot de passe oublié 😢</a>
      </div>
    </div>
  );
};

export default Login;