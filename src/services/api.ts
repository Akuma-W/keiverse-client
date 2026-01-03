import store from '@/store';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { logoutThunk, refreshToken } from '@/features/auth/auth.slice';

const BASE_URL = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL || 'htttp://localhost:3000/api/v1',
  withCredentials: true,
});

// Add access token to header
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto refresh token when token is expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post('/auth/refresh');
        const newToken = res.data.accessToken;

        store.dispatch(refreshToken(newToken));

        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        console.log(error);
        store.dispatch(logoutThunk());
      }
    }
    return Promise.reject(error);
  },
);

export default api;
