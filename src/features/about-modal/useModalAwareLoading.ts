import { useState } from 'react';
import { useDelayedLoading } from '../feed/useDelayedLoading';
import { useAboutModal } from './useAboutModal';

export function useModalAwareLoading(delay = 500) {
  const { isModalVisible } = useAboutModal();
  const [isLoading, setIsLoading] = useState(false);
  const shouldLoad = !isModalVisible;
  const showSpinner = useDelayedLoading(isLoading && shouldLoad, delay);

  return {
    setIsLoading,
    showSpinner,
  };
}
