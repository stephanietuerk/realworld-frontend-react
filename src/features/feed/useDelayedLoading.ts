import { useEffect, useState } from 'react';

export function useDelayedLoading(isLoading: boolean, delayMs = 300): boolean {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      timeout = setTimeout(() => setShowLoading(true), delayMs);
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, delayMs]);

  return showLoading;
}
