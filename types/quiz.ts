export interface Option {
  id: string;
  label: string;
}
export type QuestionType = 'mcq' | 'input';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  correctAnswer?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
 
}
export enum QuesType {
  MCQ = "mcq",
  INPUT = "input",
}