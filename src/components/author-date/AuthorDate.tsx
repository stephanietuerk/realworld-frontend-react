import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTE } from '../../shared/constants/routing';
import type {
  Article,
  ArticleMetadata,
} from '../../shared/types/articles.types';
import { formatDate } from '../../shared/utilities/date-utilities';
import Avatar from '../icons/Avatar';
import styles from './AuthorDate.module.scss';

interface AuthorDateProps {
  article: ArticleMetadata | Article;
  showDate?: boolean;
  handleHover?: (
    e: React.PointerEvent<HTMLAnchorElement>,
    isEnter: boolean,
  ) => void;
}

export default function AuthorDate({
  article,
  showDate = true,
  handleHover,
}: AuthorDateProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleHoverLocal: (
    e: React.PointerEvent<HTMLAnchorElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    setIsHovered(isEnter);
    if (handleHover) {
      handleHover(e, isEnter);
    }
  };

  if (!article.author) return null;
  return (
    <div
      className={clsx(
        styles.authorInfo,
        handleHover && styles.hasHover,
        isHovered && styles.authorInfoHovered,
      )}
    >
      <Avatar
        src={article.author.image}
        alt={`Avatar of ${article.author.username}`}
      />
      <div className={styles.authorDate}>
        <a
          role="link"
          className={styles.author}
          onPointerEnter={(e) => handleHoverLocal(e, true)}
          onPointerLeave={(e) => handleHoverLocal(e, false)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(ROUTE.profile(article.author.username));
          }}
        >
          {article.author.username}
        </a>
        {showDate && (
          <p className={styles.date}>{formatDate(article.updatedAt)}</p>
        )}
      </div>
    </div>
  );
}
