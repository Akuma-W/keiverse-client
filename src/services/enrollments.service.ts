import type {
  CreateEnrollmentDto,
  Enrollment,
  QueryEnrollmentParams,
  UpdateEnrollmentDto,
} from '@/types/enrollments.type';
import api from './api';

export const enrollmentsService = {
  create: (data: CreateEnrollmentDto) =>
    api.post<Enrollment>('/enrollments', data).then((r) => r.data),

  getAll: (params: QueryEnrollmentParams) =>
    api.get('/enrollments', { params }).then((r) => r.data),

  getByClass: (classId: number, status?: string) =>
    api.get(`/enrollments/classroom/${classId}`, { params: { status } }).then((r) => r.data),

  getByUser: (userId: number, status?: string) =>
    api.get(`/enrollments/user/${userId}`, { params: { status } }).then((r) => r.data),

  getMine: (status?: string) =>
    api.get(`/enrollments/my-enrollments`, { params: { status } }).then((r) => r.data),

  getOne: (id: number) => api.get(`/enrollments/${id}`).then((r) => r.data),

  update: (id: number, data: UpdateEnrollmentDto) =>
    api.put(`/enrollments/${id}`, data).then((r) => r.data),

  remove: (id: number) => api.delete(`/enrollments/${id}`).then((r) => r.data),

  approve: (id: number) => api.patch(`/enrollments/${id}/approve`).then((r) => r.data),

  reject: (id: number) => api.patch(`/enrollments/${id}/reject`).then((r) => r.data),
};
