import clsx from 'clsx';
import { useState, type PointerEventHandler } from 'react';
import { useAuth } from '../../api/useAuth';
import { useFavorite } from '../../api/useFavorite';
import Button from '../button/Button';
import AddAddedIcon from '../icons/AddAddedIcon';
import FavoriteIcon from '../icons/FavoriteIcon';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  count: number;
  favorited: boolean;
  slug: string;
  handlePointerEnter?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  handlePointerLeave?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  className?: string;
  displayIcon?: boolean;
  displayText?: boolean;
  plusIconSize?: number;
  selectedClassName?: string;
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
  displayText = false,
  displayIcon = true,
  plusIconSize = 24,
  selectedClassName,
}: FavoriteButtonProps) {
  const { isLoggedIn } = useAuth();
  const favorite = useFavorite(slug);
  const [hovering, setHovering] = useState<boolean>(false);
  console.log('FavoriteButton', favorited);

  const handleClick: PointerEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      favorite.mutate(favorited ? 'remove' : 'add');
    }
  };

  if (!slug) return null;
  return (
    <Button
      className={clsx(
        styles.favoriteButton,
        isLoggedIn && styles.clickable,
        !displayText && styles.noText,
        favorited && selectedClassName,
        className,
      )}
      onClick={handleClick}
      onPointerEnter={(e) => {
        setHovering(true);
        handlePointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setHovering(false);
        handlePointerLeave?.(e);
      }}
      variant={displayText ? 'secondary' : 'tertiary'}
    >
      {displayText && (
        <div className={styles.iconLabelRow}>
          <AddAddedIcon
            size={plusIconSize}
            variant={!favorited ? 'plus' : hovering ? 'minus' : 'check'}
            svgClassName={styles.plusIconSvg}
            pathClassName={styles.plusIconPath}
          ></AddAddedIcon>
          <span
            className={clsx(
              styles.instructions,
              displayIcon && styles.instructionsWithIcon,
            )}
          >
            {!favorited
              ? BUTTON_TEXT.add
              : hovering
                ? BUTTON_TEXT.remove
                : BUTTON_TEXT.added}
          </span>
        </div>
      )}
      {displayIcon && (
        <div className={styles.countIcon}>
          <FavoriteIcon
            size={displayText ? 16 : 20}
            isOutline={!favorited}
            pathClassName={styles.favoritePathFill}
          ></FavoriteIcon>
          <span className={styles.favoriteCount}>{count}</span>
        </div>
      )}
    </Button>
  );
}
