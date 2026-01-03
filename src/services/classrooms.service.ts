import type {
  Classroom,
  CreateClassroomDto,
  JoinClassroomDto,
  QueryClassroomParams,
} from '@/types/classrooms.type';
import api from './api';

export const classroomsService = {
  create: async (data: CreateClassroomDto) => {
    console.log('[ClassroomsService] create request:', data);
    const r = await api.post('/classrooms', data);
    console.log('[ClassroomsService] create response:', r.data);
    return r.data;
  },

  getAll: async (params: QueryClassroomParams) => {
    console.log('[ClassroomsService] getAll params:', params);
    const r = await api.get('/classrooms', { params });
    console.log('[ClassroomsService] getAll response:', r.data);
    return r.data;
  },

  getMine: async () => {
    console.log('[ClassroomsService] getMine request');
    const r = await api.get('/classrooms/my');
    console.log('[ClassroomsService] getMine response:', r.data);
    return r.data;
  },

  join: async (data: JoinClassroomDto) => {
    console.log('[ClassroomsService] join request:', data);
    const r = await api.post('/classrooms/join', data);
    console.log('[ClassroomsService] join response:', r.data);
    return r.data;
  },

  getMembers: async (classId: number) => {
    console.log('[ClassroomsService] getMembers request classId:', classId);
    const r = await api.get(`/classrooms/${classId}/members`);
    console.log('[ClassroomsService] getMembers response:', r.data);
    return r.data;
  },

  getById: async (id: number) => {
    console.log('[ClassroomsService] getById request:', id);
    const r = await api.get(`/classrooms/${id}`);
    console.log('[ClassroomsService] getById response:', r.data);
    return r.data;
  },

  update: async (id: number, data: Partial<Classroom>) => {
    console.log('[ClassroomsService] update request:', { id, data });
    const r = await api.put(`/classrooms/${id}`, data);
    console.log('[ClassroomsService] update response:', r.data);
    return r.data;
  },

  remove: async (id: number) => {
    console.log('[ClassroomsService] remove request:', id);
    const r = await api.delete(`/classrooms/${id}`);
    console.log('[ClassroomsService] remove response:', r.data);
    return r.data;
  },
};
