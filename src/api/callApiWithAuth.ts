import { useAuth } from './useAuth';

export interface ApiCallState {
  isLoading: boolean;
  error: unknown;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}

export async function callApiWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
  onUnauthorized?: () => void,
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
      onUnauthorized?.();
    }
    throw new ApiError('Request failed', response.status, response.statusText);
  }

  if (response.status === 204) return undefined as any;

  return response.json();
}

export function useApiWithAuth() {
  const { setToken } = useAuth();
  return <T>(url: string, options?: RequestInit) =>
    callApiWithAuth<T>(url, options, () => setToken(null));
}
