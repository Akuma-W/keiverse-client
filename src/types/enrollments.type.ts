export interface Enrollment {
  id: number;
  userId: number;
  classId: number;
  status: 'pending' | 'approved' | 'rejected';
  joinedAt: string;
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
