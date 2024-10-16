import React, { useState } from 'react';
import { Quiz, Question } from '../types';

interface QuizFormProps {
  onSaveQuiz: (quiz: Quiz) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSaveQuiz }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      options: ['', '', '', ''],
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
    setTitle('');
    setQuestions([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre du quiz
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      {questions.map((question, index) => (
        <div key={question.id} className="space-y-4">
          <input
            type="text"
            value={question.text}
            onChange={(e) => updateQuestion(index, 'text', e.target.value)}
            placeholder="Question"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                placeholder={`Option ${optionIndex + 1}`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
      <button
        type="button"
        onClick={addQuestion}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Ajouter une question
      </button>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Enregistrer le quiz
      </button>
    </form>
  );
};

export default QuizForm;