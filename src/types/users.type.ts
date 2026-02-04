import type { Assignment } from './assignment';
import type { Classroom } from './classrooms.type';
import type { Enrollment } from './enrollments.type';
import type { QuizResult } from './quiz';
import type { Role } from './roles.type';

export interface User {
  id: number;
  fullName: string;
  email: string;
  username: string;
  phone?: string;
  school?: string;
  roleId: number;
  isLocked: boolean;
  imageUrl?: string;
  createdAt: string;

  role: Role;
  classrooms: Classroom[];
  enrollments: Enrollment[];
  assignments: Assignment[];
  quizResults: QuizResult[];
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface UpdateUserDto {
  fullName?: string;
  email?: string;
  role?: string;
}

export interface QueryUsersDto {
  page?: number;
  limit?: number;
  search?: string;
}
