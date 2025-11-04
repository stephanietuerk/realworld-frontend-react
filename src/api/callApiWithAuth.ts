import { useCallback } from 'react';
import type { AppError } from '../shared/types/errors.types';
import {
  normalizeToAppError,
  parseErrorBody,
} from '../shared/utilities/errors';
import { useAuth } from './useAuth';

export interface ApiCallState {
  isLoading: boolean;
  error: AppError | null;
}

type AuthMode = 'auto' | 'required' | 'none';

export async function callApiWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
  onUnauthorized?: () => void,
  auth: AuthMode = 'auto',
): Promise<T> {
  const token = localStorage.getItem('token');

  const headers = new Headers(options.headers as HeadersInit);
  const wantsAuth = auth !== 'none';
  const haveToken = !!token;

  if (auth === 'required' && !haveToken) {
    const err: AppError = {
      message: 'Please sign in to continue.',
      status: 401,
    };
    onUnauthorized?.();
    throw err;
  }

  if (wantsAuth && haveToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Token ${token}`);
  }
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  let res: Response;
  try {
    res = await fetch(endpoint, { ...options, headers });
  } catch (e) {
    throw normalizeToAppError(e);
  }

  if (res.status === 401 && wantsAuth) {
    if (headers.has('Authorization')) {
      localStorage.removeItem('token');
    }
    onUnauthorized?.();
  }

  if (!res.ok) {
    const body = await parseErrorBody(res).catch(() => undefined);
    // Throw a plain object that normalizeToAppError understands as HTTP
    throw normalizeToAppError({
      status: res.status,
      statusText: res.statusText,
      body,
    });
  }

  if (res.status === 204 || res.status === 205) {
    return null as unknown as T;
  }

  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    const text = await res.text();
    return (text ? JSON.parse(text) : null) as T;
  }

  return (await res.text()) as unknown as T;
}

export function useApiWithAuth() {
  const { setToken: setToken } = useAuth();
  return useCallback(
    <T>(url: string, options?: RequestInit) => {
      return callApiWithAuth<T>(url, options, () => setToken(null));
    },
    [setToken],
  );
}
