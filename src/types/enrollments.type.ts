import type { Classroom } from './classrooms.type';
import type { User } from './users.type';

export interface Enrollment {
  id: number;
  userId: number;
  classId: number;
  status: 'pending' | 'approved' | 'rejected';
  roleIn: string;
  joinedAt: string;
  classroom: Classroom;

  user: User;
}

export interface CreateEnrollmentDto {
  userId: number;
  classId: number;
}

export interface UpdateEnrollmentDto {
  status?: 'pending' | 'approved' | 'rejected';
}

export interface QueryEnrollmentParams {
  page?: number;
  limit?: number;
  classId?: number;
  userId?: number;
  status?: string;
}
