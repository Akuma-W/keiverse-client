import type { ChangePasswordDto, LoginDto, RegisterDto } from '@/types/auth.type';
import api from './api';

export const authService = {
  register: (data: RegisterDto) => api.post('/auth/register/get-otp', data).then((res) => res.data),

  verifyOtp: (data: RegisterDto) => api.post('/auth/register/verify-otp', data).then((r) => r.data),

  login: (data: LoginDto) => api.post('/auth/login', data).then((r) => r.data),

  refresh: () => api.post('/auth/refresh').then((r) => r.data),

  logout: () => api.post('/auth/logout').then((r) => r.data),

  changePassword: (data: ChangePasswordDto) =>
    api.post('/auth/change-password', data).then((r) => r.data),

  getProfile: () => api.get('/auth/me').then((r) => r.data),
};
