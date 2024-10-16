import React, { useState } from 'react';
import { Quiz } from '../types';

interface QuizPlayerProps {
  quiz: Quiz;
  onFinish: () => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Votre score</h2>
        <div className="text-6xl font-bold text-blue-600 mb-4">
          {score}/{quiz.questions.length}
        </div>
        <p className="text-xl mb-6">
          {score === quiz.questions.length
            ? "Parfait ! Vous avez tout bon !"
            : "Vous pouvez faire mieux..."}
        </p>
        <button
          onClick={onFinish}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      <div className="mb-4">
        Question {currentQuestionIndex + 1}/{quiz.questions.length}
      </div>
      <h3 className="text-xl font-semibold mb-4">{currentQuestion.text}</h3>
      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPlayer;