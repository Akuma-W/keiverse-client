import type { ID, Timestamped } from './common.type';

export interface Quiz extends Timestamped {
  quizId: ID;
  classId: ID;
  title: string;
  description?: string;
  mode: 'offline' | 'online';
  timeLimit?: number;
  createdBy: ID;
}

export type QuestionType = 'mcq' | 'multi' | 'short';

export interface QuizQuestion {
  questionId: ID;
  quizId: ID;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string[] | string;
  points: number;
}

export interface QuizSession {
  sessionId: ID;
  quizId: ID;
  joinCode: string;
  startTime?: string;
  endTime?: string;
  isActive: boolean;
  socketId?: string;
}

export interface QuizResult {
  resultId: ID;
  sessionId: ID;
  quizId: ID;
  studentId: ID;
  answers: Record<string, any>;
  score: number;
  startedAt: string;
  finishedAt: string;
}
