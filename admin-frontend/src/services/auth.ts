import { api } from '../lib/api';
import type { AdminUser, LoginRequest, LoginResponse, RefreshTokenResponse } from '../types';

const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    const { accessToken, refreshToken, user } = response.data;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return response.data;
  },

  async refresh(): Promise<RefreshTokenResponse | null> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;
    const response = await api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getUser(): AdminUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
