import React from 'react';
import { Quiz } from '../types';

interface QuizListProps {
  quizzes: Quiz[];
  onSelectQuiz: (quiz: Quiz) => void;
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, onSelectQuiz }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quiz disponibles</h2>
      <ul className="space-y-2">
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <button
              onClick={() => onSelectQuiz(quiz)}
              className="w-full text-left px-4 py-2 bg-white rounded-md shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {quiz.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;