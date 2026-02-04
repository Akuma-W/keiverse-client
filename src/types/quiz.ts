export interface Quiz {
  quizId: number;
  classId: number;
  title: string;
  description?: string;
  mode: 'offline' | 'online';
  timeLimit?: number;
  createdBy: number;
}

export type QuestionType = 'mcq' | 'multi' | 'short';

export interface QuizQuestion {
  questionId: number;
  quizId: number;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string[] | string;
  points: number;
}

export interface QuizSession {
  sessionId: number;
  quizId: number;
  joinCode: string;
  startTime?: string;
  endTime?: string;
  isActive: boolean;
  socketId?: string;
}

export interface QuizResult {
  resultId: number;
  sessionId: number;
  quizId: number;
  studentId: number;
  answers: Record<string, any>;
  score: number;
  startedAt: string;
  finishedAt: string;
}
