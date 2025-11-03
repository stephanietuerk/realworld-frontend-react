import clsx from 'clsx';
import type { Article, FeedItem } from '../../shared/types/feed.types';
import styles from './Tags.module.scss';

interface TagsProps {
  article: Article | FeedItem;
  containerClassName?: string;
  tagClassName?: string;
}

export default function Tags({
  article,
  containerClassName,
  tagClassName,
}: TagsProps) {
  return (
    <div className={clsx(styles.tags, containerClassName)}>
      {article.tagList?.map((tag) => (
        <div className={clsx(styles.tag, tagClassName)} key={tag}>
          <p>{tag}</p>
        </div>
      ))}
    </div>
  );
}
