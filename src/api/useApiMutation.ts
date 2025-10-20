import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';
import type { ApiError } from '../shared/types/errors.types';
import { useApiWithAuth } from './callApiWithAuth';

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiMutationParams<TReturn, TVars = unknown> {
  url: string; // mutations should have a concrete URL
  method: HttpMethod;
  options?: RequestInit; // extra fetch options (headers, etc.)
  mutationOptions?: Omit<
    UseMutationOptions<TReturn, ApiError, TVars>,
    'mutationFn' | 'mutationKey'
  >;
}

export function useApiMutation<TReturn, TVars = unknown>({
  url,
  method,
  options,
  mutationOptions,
}: ApiMutationParams<TReturn, TVars>): UseMutationResult<
  TReturn,
  ApiError,
  TVars
> {
  const callApiWithAuth = useApiWithAuth();

  return useMutation<TReturn, ApiError, TVars>({
    mutationKey: ['api', method, url] as const,
    mutationFn: async (vars: TVars) => {
      // If the caller already set a body, we won't override it.
      // Otherwise, we JSON-encode vars by default.
      const hasBody = !!options?.body;
      const init: RequestInit = {
        method,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers as HeadersInit),
        },
        body: hasBody
          ? options!.body
          : vars === null
            ? undefined
            : JSON.stringify(vars),
      };
      return callApiWithAuth<TReturn>(url, init);
    },
    ...mutationOptions,
  });
}
