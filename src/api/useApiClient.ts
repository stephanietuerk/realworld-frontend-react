import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export interface ApiCallState {
  isLoading: boolean;
  error: unknown;
}

type AppErrors = Record<string, string[] | string>;

export class ApiError extends Error {
  status: number;
  statusText: string;
  errors?: AppErrors;

  constructor(
    message: string,
    status: number,
    statusText: string,
    errors?: AppErrors,
  ) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.errors = errors;
  }
}

type AuthenticatedCall = <T>(
  endpoint: string,
  options?: RequestInit,
) => Promise<T>;

type ApiGet = <T>(url: string) => {
  data: T | null;
  isLoading: boolean;
  error: unknown;
};

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('token');

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
    throw new Error(`Request failed: ${response.statusText}`);
  }

  return response.json();
}

export function useApiClient(): {
  useApiWithAuth: AuthenticatedCall;
  useApiGet: ApiGet;
} {
  const { setToken } = useAuth();

  const useApiWithAuth = async <T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> => {
    try {
      return await fetchWithAuth<T>(endpoint, options);
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        setToken(null);
      }
      throw error;
    }
  };

  const useApiGet = <T>(
    url: string,
  ): { data: T | null; isLoading: boolean; error: unknown } => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
      if (!url) return;

      const fetchData = async () => {
        setIsLoading(true);
        try {
          const result = await useApiWithAuth<T>(url);
          setData(result);
        } catch (err) {
          setError(err);
          setData(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [url]);

    return { data, isLoading, error };
  };

  return { useApiWithAuth, useApiGet };
}
