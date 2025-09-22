import { useEffect, useMemo, useRef, useState } from 'react';
import { useApiWithAuth, type ApiCallState } from './callApiWithAuth';
import type { ApiError } from '../shared/types/errors.types';

type Method = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiMutationParams<T> {
  url: string | null;
  method: Method;
  options?: Omit<RequestInit, 'method'>;
  onSuccess?: (data: T | null) => void;
}

export interface ApiMutationState<T> extends ApiCallState {
  data: T | null;
}

export function useApiMutation<T>({
  url,
  method,
  options = {},
  onSuccess,
}: ApiMutationParams<T>): ApiMutationState<T> {
  const callWithAuth = useApiWithAuth();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  const stableOptions = useMemo(
    () => ({ ...options, method }),
    [method, JSON.stringify(options ?? {})],
  );

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    callWithAuth<T>(url, { ...stableOptions, signal: controller.signal })
      .then((result) => {
        setData(result);
        onSuccessRef.current?.(result);
      })
      .catch((e) => {
        if (e?.kind !== 'aborted') {
          setData(null);
          setError(e);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [url, stableOptions, callWithAuth]);

  return { data, isLoading, error };
}
