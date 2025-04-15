export interface MCQOption {
    id: string;
    label: string;
  }
  
  export interface Question {
    text: string;
    type: 'mcq' | 'input';
    options: MCQOption[];
    correctAnswer: string | null;
  }
  
  export interface Quiz {
    id?: string;
    title: string;
    description: string;
    questions: Question[];
    createdAt?: string;
  }
  