import * as SecureStore from 'expo-secure-store';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { loginApi, registerApi } from './api';

type Ctx = {
  token: string | null;
  booting: boolean;
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
};

const TOKEN_KEY = 'pm_token';
const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => { (async () => {
    const t = await SecureStore.getItemAsync(TOKEN_KEY);
    if (t) setToken(t);
    setBooting(false);
  })(); }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await loginApi(email, password);
    const t = data?.access_token as string;
    if (!t) throw new Error('No token');
    await SecureStore.setItemAsync(TOKEN_KEY, t);
    setToken(t);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    await registerApi(email, password);
  }, []);

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
  }, []);

  return <AuthCtx.Provider value={{ token, booting, login, register, logout }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
