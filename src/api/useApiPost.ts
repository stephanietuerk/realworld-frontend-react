import { useEffect, useMemo, useState } from 'react';
import { useApiWithAuth } from './callApiWithAuth';

interface ApiPostParams {
  url: string | null;
  options?: Omit<RequestInit, 'method'>;
}

export interface ApiPostState<T> {
  data: T | null;
  isLoading: boolean;
  error: unknown;
}

export function useApiPost<T>({
  url,
  options = {},
}: ApiPostParams): ApiPostState<T> {
  const callWithAuth = useApiWithAuth();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const stableOptions = useMemo(
    () => ({ ...options, method: 'POST' }),
    [JSON.stringify(options ?? {})],
  );

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    callWithAuth<T>(url, { ...stableOptions, signal: controller.signal })
      .then((result) => setData(result))
      .catch((e) => {
        if (e?.name !== 'AbortError') {
          setData(null);
          setError(e);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [url, stableOptions]);

  return { data, isLoading, error };
}
