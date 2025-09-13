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
    <ul>
      {options.map((option) => (
        <li style={{ listStyle: 'none' }} key={option.id}>
          <button
            className={clsx(
              styles.selection,
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
