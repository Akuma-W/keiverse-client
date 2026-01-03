import type { CreateUserDto, QueryUsersDto, UpdateUserDto, User } from '@/types/users.type';
import api from './api';

export const usersService = {
  create: (dto: CreateUserDto) => api.post('/users', dto).then((r) => r.data),

  getAll: (params: QueryUsersDto) => api.get('/users', { params }).then((r) => r.data),

  getOne: (id: number) => api.get<User>(`/users/${id}`).then((r) => r.data),

  update: (id: number, dto: UpdateUserDto) => api.patch(`/users/${id}`, dto).then((r) => r.data),

  remove: (id: number) => api.delete(`/users/${id}`).then((r) => r.data),

  lock: (id: number) => api.patch(`/users/${id}/lock`).then((r) => r.data),

  unlock: (id: number) => api.patch(`/users/${id}/unlock`).then((r) => r.data),
};
