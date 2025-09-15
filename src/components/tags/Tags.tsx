import clsx from 'clsx';
import type {
  Article,
  ArticleMetadata,
} from '../../shared/types/articles.types';
import styles from './Tags.module.scss';

interface TagsProps {
  article: Article | ArticleMetadata;
  className?: string;
}

export default function Tags({ article, className }: TagsProps) {
  return (
    <div className={clsx(styles.tags, className)}>
      {article.tagList?.map((tag) => (
        <div className={styles.tag} key={tag}>
          <p>{tag}</p>
        </div>
      ))}
    </div>
  );
}
