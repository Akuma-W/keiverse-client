export type ClassItemType = 'ASSIGNMENT' | 'DOCUMENT' | 'FORUM' | 'SURVEY' | 'QUIZ';

/* ------------------------- Detail sub-types ------------------------- */

export interface AssignmentDetail {
  description: string;
  deadline: string;
  weight: number;
  attachments?: { name: string; size: string }[];
}

export interface DocumentDetail {
  description: string;
  fileType: string;
  size: string;
  previewUrl?: string;
}

export interface ForumDetail {
  content: string;
  comments?: {
    id: string;
    user: string;
    role: string;
    text: string;
    time: string;
    isAnonymous?: boolean;
  }[];
}

export interface SurveyDetail {
  description: string;
}

/* ------------------------------ Main type ------------------------------ */

export interface ClassItem {
  id: string;
  classId: number;
  type: ClassItemType;
  title: string;
  createdAt: string;
  createdBy: {
    id: number;
    fullName: string;
  };

  /** 👇 thêm field này */
  detail?: AssignmentDetail | DocumentDetail | ForumDetail | SurveyDetail | Record<string, any>;
}
