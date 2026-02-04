import type { Classroom, CreateClassroomDto, QueryClassroomParams } from '@/types/classrooms.type';
import api from './api';

export const classroomsService = {
  create: async (data: CreateClassroomDto) => {
    const r = await api.post('/classrooms', data);
    return r.data;
  },

  getAll: async (params: QueryClassroomParams) => {
    const r = await api.get('/classrooms', { params });
    return r.data;
  },

  getById: async (id: number) => {
    const r = await api.get(`/classrooms/${id}`);
    return r.data;
  },

  getByCode: async (code: string) => {
    const res = await api.get(`/classrooms/code/${code}`);
    return res.data;
  },

  update: async (id: number, data: Partial<Classroom>) => {
    const r = await api.put(`/classrooms/${id}`, data);
    return r.data;
  },

  remove: async (id: number) => {
    const r = await api.delete(`/classrooms/${id}`);
    return r.data;
  },
};
