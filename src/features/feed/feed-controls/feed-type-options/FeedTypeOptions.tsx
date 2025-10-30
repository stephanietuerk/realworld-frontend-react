import clsx from 'clsx';
import { useFeed } from '../../../../api/useFeed';
import type { FeedOption } from '../../../../shared/types/feed.types';
import styles from './FeedTypeOptions.module.scss';

export default function FeedTypeOptions({
  options,
}: {
  options: FeedOption[];
}) {
  const { feedSelections, setFeedSelections } = useFeed();
  return (
    <ul className={styles.options}>
      {options.map((option) => (
        <li className={styles.option} key={option.id}>
          <button
            className={clsx(
              styles.button,
              feedSelections.feed === option.id && styles.active,
            )}
            onClick={() =>
              setFeedSelections((prev) => ({ ...prev, feed: option.id }))
            }
            aria-pressed={feedSelections.feed === option.id}
          >
            {option.display}
          </button>
        </li>
      ))}
    </ul>
  );
}
