import clsx from 'clsx';
import { useArticles } from '../../../../api/useArticles';
import type { FeedOption } from '../../../../shared/types/articles.types';
import styles from './FeedTypeOptions.module.scss';

export default function FeedTypeOptions({
  options,
}: {
  options: FeedOption[];
}) {
  const { feedSelections, setFeedSelections } = useArticles();
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
