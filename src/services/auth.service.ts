import type { ChangePasswordDto, LoginDto, RegisterDto, VerifyDTO } from '@/types/auth.type';
import api from './api';

export const authService = {
  register: (data: RegisterDto) => api.post('/auth/register/get-otp', data).then((res) => res.data),

  verifyOtp: (data: VerifyDTO) => api.post('/auth/register/verify-otp', data).then((r) => r.data),

  login: (data: LoginDto) =>
    api.post('/auth/login', data).then((r) => {
      return r.data;
    }),

  logout: async () => {
    await api.post('/auth/logout');
  },

  changePassword: (data: ChangePasswordDto) =>
    api.post('/auth/change-password', data).then((r) => r.data),

  getProfile: () => api.get('/auth/me').then((r) => r.data),
};
