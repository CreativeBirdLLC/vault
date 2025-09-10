import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from '@/types';
import { storage, STORAGE_KEYS } from '@/utils/storage';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
        
        storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        storage.set(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        storage.remove(STORAGE_KEYS.USER);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API helper functions
export const apiRequest = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as ApiResponse;
      if (apiError && apiError.message) {
        throw new Error(apiError.message);
      }
      
      // Handle specific HTTP status codes
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials. Please check your email and password.');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. You do not have permission to perform this action.');
      } else if (error.response?.status === 404) {
        throw new Error('The requested resource was not found.');
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
    }
    
    throw new Error('Network error. Please check your internet connection and try again.');
  }
};

// Convenience methods
export const get = <T>(endpoint: string) => apiRequest<T>('GET', endpoint);
export const post = <T>(endpoint: string, data?: unknown) => apiRequest<T>('POST', endpoint, data);
export const put = <T>(endpoint: string, data?: unknown) => apiRequest<T>('PUT', endpoint, data);
export const del = <T>(endpoint: string) => apiRequest<T>('DELETE', endpoint);
export const patch = <T>(endpoint: string, data?: unknown) => apiRequest<T>('PATCH', endpoint, data);

export default api;
