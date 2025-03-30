// src/lib/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useEffect, useState } from 'react';

// Define your API base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/';

// Define common headers
const COMMON_HEADERS = {
  'Content-Type': 'application/json',
};

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: COMMON_HEADERS,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth.accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
    });
  }
);

// Generic GET function
export const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(url, config);
  return response.data;
};

// Generic POST function
export const postData = async <T, U>(
  url: string,
  data: U,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await api.post(url, data, config);
  return response.data;
};

// Custom hook for GET requests
export const useFetch = <T>(url: string, config?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get<T>(url, config);
        setData(result.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, loading, error };
};

// Custom hook for POST requests
export const usePost = <T, U>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<T | null>(null);

  const executePost = async (url: string, data: U, config?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const result = await api.post<T>(url, data, config);
      setResponse(result.data);
      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { executePost, response, loading, error };
};

// Error type guard
export function isApiError(error: unknown): error is ApiError {
  return (error as ApiError).message !== undefined;
}

// Type definitions
interface ApiError {
  message: string;
  status?: number;
}

export type { ApiError };