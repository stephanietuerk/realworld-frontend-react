import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../api/useAuth';
import FavoriteIcon from '../icons/FavoriteIcon';
import styles from './FavoriteReadout.module.scss';
import { NAVBAR_ROUTES_NO_AUTH } from '../../shared/constants/nav-routes';

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
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return (
    <>
      <div className={clsx(styles.container, className)}>
        <FavoriteIcon
          size={18}
          isOutline={isOutline}
          className={clsx(
            styles.favoriteSvg,
            isOutline && styles.favoriteSvgOutline,
          )}
        ></FavoriteIcon>
        <span className={styles.favoriteCount}>
          {count} {expandedContext && 'favorited'}
        </span>
      </div>
      {expandedContext && !isLoggedIn && LOGIN_ROUTE && REGISTER_ROUTE && (
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
    </>
  );
}
