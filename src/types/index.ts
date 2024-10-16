export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  showTitle: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}