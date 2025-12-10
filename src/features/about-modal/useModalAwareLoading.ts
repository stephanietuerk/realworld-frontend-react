import { useState } from 'react';
import { useDelayedLoading } from '../feed/useDelayedLoading';
import { useAboutModal } from './useAboutModal';

export function useModalAwareLoading(externalIsLoading?: boolean, delay = 500) {
  const { isModalVisible } = useAboutModal();
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const isLoading = externalIsLoading ?? internalIsLoading;
  const shouldLoad = !isModalVisible;
  const showSpinner = useDelayedLoading(isLoading && shouldLoad, delay);

  return { setIsLoading: setInternalIsLoading, showSpinner };
}
