import React, { useState } from 'react';
import { Quiz, Question } from '../types';

interface QuizCreatorProps {
  onSaveQuiz: (quiz: Quiz) => void;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ onSaveQuiz }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      options: ['', '', ''],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | number) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === index) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title,
      questions,
    };
    onSaveQuiz(newQuiz);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Créer un nouveau quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Titre du quiz"
            required
          />
        </div>
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
            <input
              type="text"
              value={question.text}
              onChange={(e) => updateQuestion(index, 'text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Question?"
              required
            />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[optionIndex] = e.target.value;
                    updateQuestion(index, 'options', newOptions);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={`Choix ${optionIndex + 1}`}
                  required
                />
                <input
                  type="radio"
                  name={`correct-${question.id}`}
                  checked={question.correctAnswer === optionIndex}
                  onChange={() => updateQuestion(index, 'correctAnswer', optionIndex)}
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            + AJOUTER UN CHOIX
          </button>
          <button
            type="button"
            onClick={() => setQuestions(questions.slice(0, -1))}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            SUPPR. DERNIER CHOIX
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          VALIDER
        </button>
      </form>
    </div>
  );
};

export default QuizCreator;