import clsx from 'clsx';
import { useState, type MouseEventHandler } from 'react';
import { useAuth } from '../../api/useAuth';
import { useFollow } from '../../api/useFollow';
import type { Profile } from '../../shared/types/feed.types';
import Button, { type ButtonSize, type ButtonVariant } from '../button/Button';
import AddAddedIcon from '../icons/AddAddedIcon';
import styles from './FollowButton.module.scss';

interface FollowButtonProps {
  profile: Profile;
  syncWithApi: () => void;
  buttonSize?: ButtonSize;
  className?: string;
  iconSize?: number;
  variant?: ButtonVariant;
  selectedClassName?: string;
}

export default function FollowButton({
  profile,
  buttonSize = 'sm',
  className,
  iconSize = 24,
  variant = 'secondary',
  selectedClassName,
}: FollowButtonProps) {
  const { isLoggedIn } = useAuth();
  const follow = useFollow(profile.username);
  const isFollowing = profile.following;
  const [hovering, setHovering] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      follow.mutate(isFollowing ? 'remove' : 'add');
    }
  };

  return (
    <Button
      size={buttonSize}
      className={clsx(
        styles.followButton,
        isFollowing && selectedClassName,
        className,
      )}
      onClick={handleClick}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      variant={variant}
    >
      <AddAddedIcon
        size={iconSize}
        variant={!isFollowing ? 'plus' : hovering ? 'minus' : 'check'}
        svgClassName={styles.iconSvg}
        pathClassName={styles.iconPath}
      ></AddAddedIcon>
      <span className={styles.text}>
        {!isFollowing ? 'Follow' : hovering ? 'Unfollow' : 'Following'}{' '}
        {profile.username}
      </span>
    </Button>
  );
}
