import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTE } from '../../shared/constants/routing';
import type { Profile } from '../../shared/types/feed.types';
import { formatDate } from '../../shared/utilities/date-utilities';
import Avatar from '../icons/Avatar';
import styles from './AuthorDate.module.scss';

interface AuthorDateProps {
  author: Profile;
  className?: string;
  layout?: 'stacked' | 'inline';
  handleHover?: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void;
  showDate?: boolean;
  updatedAt?: Date;
}

export default function AuthorDate({
  author,
  className,
  layout = 'stacked',
  handleHover,
  showDate = true,
  updatedAt,
}: AuthorDateProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleHoverLocal: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    setIsHovered(isEnter);
    if (handleHover) {
      handleHover(e, isEnter);
    }
  };

  if (!author) return null;
  return (
    <div
      className={clsx(
        styles.authorInfo,
        handleHover && styles.hasBackgroundOnHover,
        isHovered && styles.isHovered,
        styles[layout],
        className,
      )}
    >
      <Avatar
        src={author.image}
        alt={`Avatar of ${author.username}`}
        size={layout === 'inline' ? 24 : 32}
      />
      <div className={clsx(styles.authorDate, styles[layout])}>
        <button
          role='link'
          className={clsx(styles.author, styles[layout])}
          onPointerEnter={(e) => handleHoverLocal(e, true)}
          onPointerLeave={(e) => handleHoverLocal(e, false)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(ROUTE.profile(author.username));
          }}
        >
          {author.username}
        </button>
        {showDate && updatedAt && (
          <>
            {layout === 'inline' && (
              <div className={styles.divider}>&bull;</div>
            )}
            <p className={clsx(styles.date, styles[layout])}>
              {formatDate(updatedAt)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
