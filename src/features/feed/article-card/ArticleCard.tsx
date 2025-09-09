import clsx from 'clsx';
import { useState, type Dispatch } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useArticles } from '../../../api/useArticles';
import { useAuth } from '../../../api/useAuth';
import AuthorDate from '../../../components/author-date/AuthorDate';
import FavoriteButton from '../../../components/favorite-button/FavoriteButton';
import FavoriteReadout from '../../../components/favorite-readout/FavoriteReadout';
import Tags from '../../../components/tags/Tags';
import { ROUTE } from '../../../shared/constants/routing';
import type { ArticleMetadata } from '../../../shared/types/articles.types';
import styles from './ArticleCard.module.scss';

function handleNonCardHover(
  e: React.PointerEvent<HTMLButtonElement>,
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
  article: ArticleMetadata;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { hasToken } = useAuth();
  const { username: profile } = useParams();
  const { refetchArticles: refetch } = useArticles();
  const [favoriteIsHovered, setFavoriteIsHovered] = useState(false);
  const [authorIsHovered, setAuthorIsHovered] = useState(false);

  const handleAuthorHover: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    const canSet = profile !== article.author.username;
    handleNonCardHover(e, setAuthorIsHovered, canSet, isEnter);
  };

  const handleFavoriteHover: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    handleNonCardHover(e, setFavoriteIsHovered, hasToken, isEnter);
  };

  return (
    <Link
      to={ROUTE.article(article.slug)}
      className={clsx(
        styles.articleCard,
        (favoriteIsHovered || authorIsHovered) &&
          styles.articleCardFavoriteHovered,
      )}
    >
      <div className={styles.topRow}>
        <AuthorDate
          article={article}
          handleHover={handleAuthorHover}
        ></AuthorDate>
      </div>
      <p className={styles.title}>{article.title}</p>
      <p className={styles.description}>{article.description}</p>
      <div className={styles.bottomRow}>
        <Tags article={article} className={styles.tags}></Tags>
        {hasToken ? (
          <FavoriteButton
            favorited={article.favorited}
            count={article.favoritesCount}
            slug={article.slug}
            handlePointerEnter={(e) => handleFavoriteHover(e, true)}
            handlePointerLeave={(e) => handleFavoriteHover(e, false)}
            syncWithApi={refetch}
          ></FavoriteButton>
        ) : (
          <FavoriteReadout
            count={article.favoritesCount}
            favorited={article.favorited}
          ></FavoriteReadout>
        )}
      </div>
    </Link>
  );
}
