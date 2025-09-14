import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../api/useAuth';
import { NAVBAR_ROUTES_NO_AUTH } from '../../app/header/Header';
import FavoriteIcon from '../icons/FavoriteIcon';
import styles from './FavoriteReadout.module.scss';

interface FavoriteReadoutProps {
  count: number;
  isOutline?: boolean;
  className?: string;
  expandedContext?: boolean;
}

const LOGIN_ROUTE =
  NAVBAR_ROUTES_NO_AUTH.find((x) => x.key === 'login') ?? null;

const REGISTER_ROUTE =
  NAVBAR_ROUTES_NO_AUTH.find((x) => x.key === 'register') ?? null;

export default function FavoriteReadout({
  count,
  className,
  isOutline = false,
  expandedContext = false,
}: FavoriteReadoutProps) {
  const { hasToken } = useAuth();
  const location = useLocation();

  return (
    <div>
      <div className={clsx(styles.container, className)}>
        <FavoriteIcon
          size={20}
          isOutline={isOutline}
          svgClassName={styles.favoriteSvg}
          pathClassName={styles.favoritePathFill}
        ></FavoriteIcon>
        <span className={styles.favoriteCount}>
          {count} {expandedContext && 'favorited'}
        </span>
      </div>
      {expandedContext && !hasToken && LOGIN_ROUTE && REGISTER_ROUTE && (
        <div className={clsx(styles.loginText, className)}>
          <NavLink
            to={LOGIN_ROUTE.path()}
            state={{ backgroundLocation: location }}
            className={styles.loginLink}
          >
            Sign in
          </NavLink>
          <span>&nbsp;or&nbsp;</span>
          <NavLink
            to={REGISTER_ROUTE.path()}
            state={{ backgroundLocation: location }}
            className={styles.loginLink}
          >
            Sign up
          </NavLink>
          <p>&nbsp;to favorite</p>
        </div>
      )}
    </div>
  );
}
