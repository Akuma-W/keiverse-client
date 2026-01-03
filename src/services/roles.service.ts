import type { CreateRoleDto, QueryRolesDto, Role, UpdateRoleDto } from '@/types/roles.type';
import api from './api';

export const rolesService = {
  create: (dto: CreateRoleDto) => api.post('/roles', dto).then((r) => r.data),

  getAll: (params: QueryRolesDto) => api.get('/roles', { params }).then((r) => r.data),

  getOne: (id: number) => api.get<Role>(`/roles/${id}`).then((r) => r.data),

  getByName: (name: string) => api.get(`/roles/name/${name}`).then((r) => r.data),

  update: (id: number, dto: UpdateRoleDto) => api.patch(`/roles/${id}`, dto).then((r) => r.data),

  remove: (id: number) => api.delete(`/roles/${id}`).then((r) => r.data),

  getUsers: (id: number) => api.get(`/roles/${id}/users`).then((r) => r.data),

  getUserCount: (id: number) => api.get(`/roles/${id}/users/count`).then((r) => r.data),
};
