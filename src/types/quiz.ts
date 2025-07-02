
export type Topic = 
  | 'Python'
  | 'JavaScript'
  | 'Git'
  | 'Linux'
  | 'HTML/CSS'
  | 'React'
  | 'Node.js'
  | 'SQL'
  | 'Docker'
  | 'AWS';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: Topic;
  difficulty: Difficulty;
}
