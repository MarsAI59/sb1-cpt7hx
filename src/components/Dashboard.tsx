import React from 'react';
import { User, Quiz } from '../types';

interface DashboardProps {
  user: User;
  quizzes: Quiz[];
  onCreateQuiz: () => void;
  onPlayQuiz: (quiz: Quiz) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, quizzes, onCreateQuiz, onPlayQuiz }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Vos quiz</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => onPlayQuiz(quiz)} className="text-indigo-600 hover:text-indigo-900 mr-4">Jouer</button>
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">Éditer</button>
                  <button className="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={onCreateQuiz}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Créer un nouveau quiz
      </button>
    </div>
  );
};

export default Dashboard;