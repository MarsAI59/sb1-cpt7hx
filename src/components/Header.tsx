import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  setCurrentView: (view: 'dashboard' | 'creator' | 'player' | 'analyzer') => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, setCurrentView }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">QRuiz</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="text-gray-600 hover:text-gray-900">
                  Créer
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('player')} className="text-gray-600 hover:text-gray-900">
                  Répondre
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('analyzer')} className="text-gray-600 hover:text-gray-900">
                  Analyser
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user.username}</span>
          <button
            onClick={onLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;