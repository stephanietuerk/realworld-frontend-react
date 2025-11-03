import clsx from 'clsx';
import { useState, type Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../api/useAuth';
import AuthorDate from '../../../components/author-date/AuthorDate';
import FavoriteButton from '../../../components/favorite-button/FavoriteButton';
import FavoriteReadout from '../../../components/favorite-readout/FavoriteReadout';
import Tags from '../../../components/tags/Tags';
import { ROUTE } from '../../../shared/constants/routing';
import type { FeedItem } from '../../../shared/types/feed.types';
import styles from './ArticleCard.module.scss';

function handleNonCardHover(
  e: React.PointerEvent<HTMLAnchorElement | HTMLButtonElement>,
  setFx: Dispatch<React.SetStateAction<boolean>>,
  canSet: boolean,
  value: boolean,
): void {
  e.preventDefault();
  e.stopPropagation();
  if (canSet) {
    setFx(value);
  }
}

interface ArticleCardProps {
  article: FeedItem;
  isLoggedInUsersProfile?: boolean;
}

export default function ArticleCard({
  article,
  isLoggedInUsersProfile,
}: ArticleCardProps) {
  const { isLoggedIn } = useAuth();
  const [favoriteIsHovered, setFavoriteIsHovered] = useState(false);
  const [authorIsHovered, setAuthorIsHovered] = useState(false);

  const handleAuthorHover: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    handleNonCardHover(e, setAuthorIsHovered, true, isEnter);
  };

  const handleFavoriteHover: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    handleNonCardHover(e, setFavoriteIsHovered, isLoggedIn, isEnter);
  };

  return (
    <Link
      to={ROUTE.article(article.slug)}
      className={clsx(
        styles.articleCard,
        (favoriteIsHovered || authorIsHovered) &&
          styles.articleCardButtonHovered,
      )}
    >
      <div className={styles.topRow}>
        <AuthorDate
          author={article.author}
          updatedAt={article.updatedAt}
          handleHover={handleAuthorHover}
          disabled={isLoggedInUsersProfile}
        ></AuthorDate>
      </div>
      <p className={styles.title}>{article.title}</p>
      <p className={styles.description}>{article.description}</p>
      <div className={styles.bottomRow}>
  <Tags article={article} containerClassName={styles.tags} />
        {isLoggedIn ? (
          <FavoriteButton
            className={styles.favoriteButton}
            favorited={article.favorited}
            count={article.favoritesCount}
            slug={article.slug}
            handlePointerEnter={(e) => handleFavoriteHover(e, true)}
            handlePointerLeave={(e) => handleFavoriteHover(e, false)}
          ></FavoriteButton>
        ) : (
          <FavoriteReadout
            count={article.favoritesCount}
            className={styles.favoriteReadout}
          ></FavoriteReadout>
        )}
      </div>
    </Link>
  );
}
