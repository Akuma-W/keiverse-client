import type { ID, Timestamped } from './common.type';

export interface Survey extends Timestamped {
  surveyId: ID;
  classId: ID;
  title: string;
  description?: string;
  options: string[];
  createBy: ID;
  isActive: boolean;
}

export interface SurveyResponse extends Timestamped {
  responseId: ID;
  surveyId: ID;
  userId: ID;
  answers: string[];
  submitAt: string;
  isAnonymous?: boolean;
}
