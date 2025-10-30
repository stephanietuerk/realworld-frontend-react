import clsx from 'clsx';
import Button from '../../../../components/button/Button';
import styles from './TagOptions.module.scss';

export const NONE_TAG = 'everything';

export default function TagOptions({
  tags,
  selected,
  toggleTag,
}: {
  tags: string[];
  selected: string[];
  toggleTag: (tag: string) => void;
}) {
  const sortedTags = [NONE_TAG, ...tags.slice().sort()];

  return (
    <>
      {sortedTags.map((tag) => (
        <Button
          key={tag}
          animateOnClick={false}
          variant='secondary'
          pressed={selected.includes(tag)}
          className={clsx(styles.tag, selected.includes(tag) && styles.active)}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Button>
      ))}
    </>
  );
}
