import axios, { type AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: false,
});

// Add access token to header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto refresh token when token is expired
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: () => void;
}> = [];

const processQueue = (token: string | null) => {
  failedQueue.forEach((p) => (token ? p.resolve(token) : p.reject()));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(api(original));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await api.post('/auth/refresh');
        const newToken = (res.data as any)?.accessToken;

        localStorage.setItem('accessToken', newToken);
        processQueue(newToken);

        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        localStorage.removeItem('accessToken');
        processQueue(null);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
