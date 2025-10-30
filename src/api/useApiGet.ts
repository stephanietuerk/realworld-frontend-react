import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import type { AppError } from '../shared/types/errors.types';
import { useApiWithAuth } from './callApiWithAuth';

interface ApiGetParams<TRawData, TData = TRawData> {
  queryKey: unknown[];
  url?: string;
  options?: RequestInit;
  enabled?: boolean;
  queryOptions?: Omit<
    UseQueryOptions<TRawData, AppError, TData>,
    'queryKey' | 'queryFn' | 'enabled'
  >;
}

export function useApiGet<TRawData, TData = TRawData>({
  queryKey,
  url,
  options,
  enabled = true,
  queryOptions,
}: ApiGetParams<TRawData, TData>): UseQueryResult<TData, AppError> {
  const callWithAuth = useApiWithAuth();

  return useQuery<TRawData, AppError, TData>({
    queryKey,
    enabled: Boolean(url) && enabled,
    queryFn: ({ signal }) => {
      if (!url) throw new Error('Missing URL');
      return callWithAuth<TRawData>(url, { ...options, method: 'GET', signal });
    },
    ...queryOptions,
  });
}
