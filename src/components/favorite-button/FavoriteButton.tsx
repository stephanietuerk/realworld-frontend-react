import clsx from 'clsx';
import { useState, type MouseEventHandler } from 'react';
import { useAuth } from '../../api/useAuth';
import { useFavoriteActions } from '../../api/useFavorite';
import AddAddedIcon from '../icons/AddAddedIcon';
import FavoriteIcon from '../icons/FavoriteIcon';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  count: number;
  favorited: boolean;
  slug: string;
  handlePointerEnter?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  handlePointerLeave?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  syncWithApi: () => void;
  className?: string;
  displayIcon?: boolean;
  displayText?: boolean;
  plusIconSize?: number;
}

const BUTTON_TEXT = {
  add: 'Favorite article',
  added: 'Favorited',
  remove: 'Remove favorite',
};

export default function FavoriteButton({
  className,
  count,
  favorited,
  slug,
  handlePointerEnter,
  handlePointerLeave,
  syncWithApi,
  displayText = false,
  displayIcon = true,
  plusIconSize = 24,
}: FavoriteButtonProps) {
  const { hasToken } = useAuth();
  const { favoriteArticle, unfavoriteArticle } = useFavoriteActions();
  const [localFavorited, setLocalFavorited] = useState<boolean>(favorited);
  const [localCount, setLocalCount] = useState<number>(count);
  const [hovering, setHovering] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (!hasToken) {
      return;
    }

    const isRemovingFavorite = localFavorited;

    setLocalFavorited(!localFavorited);
    setLocalCount((c) => c + (isRemovingFavorite ? -1 : 1));

    try {
      const action = isRemovingFavorite ? unfavoriteArticle : favoriteArticle;
      await action(slug).then(() => syncWithApi());
    } catch (error) {
      setLocalFavorited(isRemovingFavorite);
      setLocalCount((c) => c + (isRemovingFavorite ? 1 : -1));
    }
  };

  if (!slug) return null;
  return (
    <button
      className={clsx(styles.button, hasToken && styles.clickable, className)}
      onPointerEnter={(e) => {
        setHovering(true);
        handlePointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setHovering(false);
        handlePointerLeave?.(e);
      }}
      onClick={handleClick}
    >
      {displayText && (
        <>
          <AddAddedIcon
            size={plusIconSize}
            variant={!localFavorited ? 'plus' : hovering ? 'minus' : 'check'}
            svgClassName={styles.plusIconSvg}
            pathClassName={styles.plusIconPath}
          ></AddAddedIcon>
          <span
            className={clsx(
              styles.instructions,
              displayIcon && styles.instructionsWithIcon,
            )}
          >
            {!localFavorited
              ? BUTTON_TEXT.add
              : hovering
                ? BUTTON_TEXT.remove
                : BUTTON_TEXT.added}
          </span>
        </>
      )}
      {displayIcon && (
        <div className={styles.countIcon}>
          <FavoriteIcon
            size={16}
            isOutline={!localFavorited}
            pathClassName={styles.favoritePathFill}
          ></FavoriteIcon>
          <span className={styles.favoriteCount}>{localCount}</span>
        </div>
      )}
    </button>
  );
}
