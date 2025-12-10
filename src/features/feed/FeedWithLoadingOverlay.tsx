import { useFeed } from '../../api/useFeed';
import { LoadingOverlay } from '../../components/loading-overlay/LoadingOverlay';
import { useModalAwareLoading } from '../about-modal/useModalAwareLoading';
import type { FeedOption } from '../../shared/types/feed.types';
import Feed from './Feed';

export default function FeedWithLoadingOverlay({
  options,
}: {
  options: FeedOption[];
}) {
  const { isPending } = useFeed();
  const { showSpinner } = useModalAwareLoading(isPending);

  return (
    <>
      {showSpinner && <LoadingOverlay />}
      <Feed options={options} />
    </>
  );
}
