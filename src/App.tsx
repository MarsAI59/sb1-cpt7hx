import React, { useState } from 'react';
import { User, Quiz } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QuizCreator from './components/QuizCreator';
import QuizPlayer from './components/QuizPlayer';
import Header from './components/Header';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentView, setCurrentView] = useState<'dashboard' | 'creator' | 'player' | 'analyzer'>('dashboard');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  const handleCreateQuiz = (newQuiz: Quiz) => {
    setQuizzes([...quizzes, newQuiz]);
    setCurrentView('dashboard');
  };

  const handlePlayQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView('player');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <Header user={user} onLogout={handleLogout} setCurrentView={setCurrentView} />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            quizzes={quizzes}
            onCreateQuiz={() => setCurrentView('creator')}
            onPlayQuiz={handlePlayQuiz}
          />
        )}
        {currentView === 'creator' && (
          <QuizCreator onSaveQuiz={handleCreateQuiz} />
        )}
        {currentView === 'player' && selectedQuiz && (
          <QuizPlayer quiz={selectedQuiz} onFinish={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'analyzer' && (
          <div>Analyseur de quiz (à implémenter)</div>
        )}
      </main>
    </div>
  );
};

export default App;