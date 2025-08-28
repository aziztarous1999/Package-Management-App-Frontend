import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const base = (Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL
  || Constants.manifest?.extra?.EXPO_PUBLIC_API_URL
  || 'http://127.0.0.1:5000').replace(/\/$/, '');


export const api = axios.create({ baseURL: base, timeout: 10000 });

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('pm_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export async function ensureToken(): Promise<string> {
  const t = await SecureStore.getItemAsync('pm_token');
  if (!t) throw new Error('Not authenticated');
  return t;
}

// endpoints
export const loginApi = (email: string, password: string) => api.post('/auth/login', { email, password });
export const registerApi = (email: string, password: string) => api.post('/auth/register', { email, password });
export const createColisApi = (p: {recipient_name:string; address:string; description?:string}) => api.post('/colis', p);
export const trackColisApi = (id: string) => api.get(`/colis/${encodeURIComponent(id)}`);
export const listColisApi = () => api.get('/colis/all');