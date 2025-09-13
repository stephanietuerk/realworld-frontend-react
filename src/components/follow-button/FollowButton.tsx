import clsx from 'clsx';
import { useState, type MouseEventHandler } from 'react';
import { useAuth } from '../../api/useAuth';
import { useFollowActions } from '../../api/useFollow';
import type { Profile } from '../../shared/types/articles.types';
import AddAddedIcon from '../icons/AddAddedIcon';
import styles from './FollowButton.module.scss';
import Button, { type ButtonVariant } from '../button/Button';

interface FollowButtonProps {
  profile: Profile;
  className?: string;
  iconSize?: number;
  variant?: ButtonVariant;
}

export default function FollowButton({
  profile,
  className,
  iconSize = 24,
  variant = 'secondary',
}: FollowButtonProps) {
  const { hasToken } = useAuth();
  const { followUser, unfollowUser } = useFollowActions();
  const [localFollowing, setLocalFollowing] = useState<boolean>(
    profile.following,
  );
  const [hovering, setHovering] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (hasToken) {
      const isUnfollowing = localFollowing;

      setLocalFollowing(!localFollowing);

      try {
        const action = isUnfollowing ? unfollowUser : followUser;
        await action(profile.username);
      } catch (error) {
        setLocalFollowing(isUnfollowing);
      }
    }
  };

  return (
    <Button
      className={clsx(styles.followButton, className)}
      onClick={handleClick}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      variant={variant}
    >
      <AddAddedIcon
        size={iconSize}
        variant={!localFollowing ? 'plus' : hovering ? 'minus' : 'check'}
        svgClassName={styles.iconSvg}
        pathClassName={styles.iconPath}
      ></AddAddedIcon>
      <span className={styles.text}>
        {!localFollowing ? 'Follow' : hovering ? 'Unfollow' : 'Following'}{' '}
        {profile.username}
      </span>
    </Button>
  );
}
