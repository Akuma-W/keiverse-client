import React from 'react';

export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
}

export interface ClassRoom {
  id: string;
  title: string;
  code: string;
  section?: string;
  bannerGradient: string;
  teacherName: string;
  studentsCount: number;
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string; // ISO date
  status: 'assigned' | 'submitted' | 'late' | 'graded';
  grade?: number;
}

export interface Quiz {
  id: string;
  title: string;
  questionsCount: number;
  durationMinutes: number;
}

export interface NavItem {
  label: string;
  href: string;
  // Fix: Reference React.ComponentType by importing React
  icon: React.ComponentType<any>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

// Assignment detail
export interface AssignmentDetail {
  description: string;
  deadline: string;
  weight: number; // %
  attachments: {
    name: string;
    size: string;
  }[];
}

// Resource detail
export interface ResourceDetail {
  description: string;
  size: string;
  fileType: string;
  previewUrl?: string;
}

// Forum post
export interface ForumPostDetail {
  author: string;
  isAnonymous: boolean;
  content: string;
  parentPost?: {
    id: string;
    title: string;
    author: string;
  };
  comments: {
    id: string;
    user: string;
    role: string;
    text: string;
    time: string;
    isAnonymous?: boolean;
  }[];
}

// Survey
export interface SurveyDetail {
  description: string;
}
