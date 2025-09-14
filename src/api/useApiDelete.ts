import { useEffect, useMemo, useRef, useState } from 'react';
import { useApiWithAuth } from './callApiWithAuth';

interface ApiDeleteParams {
  url: string | null;
  options?: Omit<RequestInit, 'method'>;
  onSuccess?: () => void;
}

export interface ApiDeleteState {
  isLoading: boolean;
  error: unknown;
}

export function useApiDelete({
  url,
  options = {},
  onSuccess,
}: ApiDeleteParams): ApiDeleteState {
  console.log(url);
  const callWithAuth = useApiWithAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  const stableOptions = useMemo(
    () => ({ ...options, method: 'DELETE' }),
    [JSON.stringify(options ?? {})],
  );

  useEffect(() => {
    console.log('apiDelete');
    if (!url) return;

    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    callWithAuth(url, { ...stableOptions, signal: controller.signal })
      .then(() => onSuccessRef.current?.())
      .catch((e) => {
        if (e?.name !== 'AbortError') {
          setError(e);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [url, stableOptions]);

  return { isLoading, error };
}
