import axios from 'axios';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const api = axios.create({
  baseURL: 'http://13.213.72.15:5000',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = storage.getString('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const method = (config.method || 'get').toUpperCase();
    const base = config.baseURL || '';
    const url = typeof config.url === 'string' ? config.url : '';
    console.log(`[api] ${method} ${base}${url}`);
  } catch {}
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
