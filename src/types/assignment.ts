import type { ID, Timestamped } from './common.type';

export interface AttachmentFile {
  fileName: string;
  url: string;
  size?: number;
}

export interface Assignment extends Timestamped {
  assignmentId: ID;
  classId: ID;
  title: string;
  description?: string;
  attachments?: AttachmentFile[];
  dueDate: string;
  structureId: ID;
}

export interface SubmissionFile {
  url: string;
  size?: number;
  type?: string;
}

export interface Submission extends Timestamped {
  submitId: ID;
  assignmentId: ID;
  studentId: ID;
  files?: SubmissionFile[];
  content?: string;
  submitAt: string;
  score?: number;
  feedback?: string;
}
