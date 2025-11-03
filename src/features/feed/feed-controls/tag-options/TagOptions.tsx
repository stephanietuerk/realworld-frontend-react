import clsx from 'clsx';
import Button from '../../../../components/button/Button';
import styles from './TagOptions.module.scss';

export const NONE_TAG = 'everything';

export default function TagOptions({
  tags,
  selected,
  toggleTag,
  isLoading,
}: {
  tags: string[];
  selected: string[];
  toggleTag: (tag: string) => void;
  isLoading: boolean;
}) {
  const sortedTags = [NONE_TAG, ...tags.slice().sort()];

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.skeletonRow}></div>
          <div className={styles.skeletonRow}></div>
          <div className={styles.skeletonRow}></div>
        </div>
      )}
      {!isLoading &&
        sortedTags.map((tag) => (
          <Button
            key={tag}
            animateOnClick={false}
            variant='secondary'
            pressed={selected.includes(tag)}
            className={clsx(
              styles.tag,
              selected.includes(tag) && styles.active,
            )}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Button>
        ))}
    </>
  );
}
