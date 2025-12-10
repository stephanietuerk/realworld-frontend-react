import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../api/useAuth';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import { APP_NAME } from '../../shared/constants/app';
import styles from './Header.module.scss';
import AccountMenu from './account-menu/AccountMenu';
import {
  NAVBAR_ROUTES_AUTH,
  NAVBAR_ROUTES_NO_AUTH,
} from '../../shared/constants/nav-routes';
import { ROUTE } from '../../shared/constants/routing';

export default function Header() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { user } = useAuthenticatedUser();

  const routes = isLoggedIn ? NAVBAR_ROUTES_AUTH : NAVBAR_ROUTES_NO_AUTH;

  return (
    <nav className={styles.nav}>
      <div className={styles.widthContainer}>
        <Link to={ROUTE.explore}>
          <h1 className={styles.name}>{APP_NAME}</h1>
        </Link>
        <div className={styles.links}>
          {routes.map((route) => {
            if (route.type === 'page') {
              return (
                <NavLink
                  to={
                    route.key === 'profile'
                      ? route.path(user?.username)
                      : route.path()
                  }
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : styles.link
                  }
                  key={route.key}
                >
                  {route.display}
                </NavLink>
              );
            } else {
              return (
                <NavLink
                  to={route.path()}
                  state={{ backgroundLocation: location }}
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : styles.link
                  }
                  key={route.key}
                >
                  {route.display}
                </NavLink>
              );
            }
          })}
          {isLoggedIn && <AccountMenu className={styles.link} />}
        </div>
      </div>
    </nav>
  );
}
