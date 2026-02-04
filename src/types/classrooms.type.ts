import type { User } from './users.type';

export interface Classroom {
  id: number;
  title: string;
  description: string;
  code: string;
  teacherId: number;
  createdAt: string;

  termStart: string;
  termEnd: string;

  teacher: User;
  _count?: {
    enrollments: number;
  };
}

export interface CreateClassroomDto {
  title: string;
  description: string;
  termStart: string;
  termEnd: string;
}

export interface JoinClassroomDto {
  code: string;
}

export interface QueryClassroomParams {
  page?: number;
  limit?: number;
  search?: string;
}
