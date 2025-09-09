import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApiWithAuth } from './callApiWithAuth';

interface ApiGetParams {
  url: string | null;
  options?: RequestInit;
}

interface ApiGetState<T> {
  data: T | null;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

export function useApiGet<T>({ url, options }: ApiGetParams): ApiGetState<T> {
  const callWithAuth = useApiWithAuth();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const stableOptions = useMemo(() => options, [JSON.stringify(options ?? {})]);
  const refetch = useCallback(() => {
    setRefetchIndex((i) => i + 1);
  }, []);

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
  }, [url, stableOptions, refetchIndex]);

  return { data, isLoading, error, refetch };
}
