import { useCallback } from 'react';
import type { ApiError, ApiErrorBody } from '../shared/types/errors.types';
import { useAuth } from './useAuth';

export interface ApiCallState {
  isLoading: boolean;
  error: ApiError | null;
}

export async function callApiWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
  onUnauthorized?: () => void,
): Promise<T> {
  const token = localStorage.getItem('token');

  const headers = new Headers(options.headers as HeadersInit);
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Token ${token}`); // RealWorld uses "Token"
  }
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  let res: Response;
  try {
    res = await fetch(endpoint, { ...options, headers });
  } catch (e: any) {
    if (e?.name === 'AbortError') {
      throw { kind: 'aborted' } as const;
    }
    throw { kind: 'network', message: e?.message ?? 'Network error' } as const;
  }

  if (res.status === 401) {
    localStorage.removeItem('token');
    onUnauthorized?.();
  }

  if (!res.ok) {
    let body: ApiErrorBody | undefined;
    try {
      const text = await res.text();
      if (text) {
        try {
          body = JSON.parse(text);
        } catch {
          body = { message: text.slice(0, 2000) };
        }
      }
    } catch {}

    throw {
      kind: 'http',
      status: res.status,
      statusText: res.statusText,
      body,
    } satisfies ApiError;
  }

  if (res.status === 204 || res.status === 205) {
    return null as unknown as T;
  }
  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    return (await res.json()) as T;
  }

  return (await res.text()) as unknown as T;
}

export function useApiWithAuth() {
  const { setToken } = useAuth();
  return useCallback(
    <T>(url: string, options?: RequestInit) => {
      return callApiWithAuth<T>(url, options, () => setToken(null));
    },
    [setToken],
  );
}
