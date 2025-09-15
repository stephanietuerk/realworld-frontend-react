import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../api/useAuth';
import { useUser } from '../../api/useUser';
import { APP_NAME } from '../../shared/constants/app';
import { ROUTE, type RouteId } from '../../shared/constants/routing';
import styles from './Header.module.scss';

interface RouteConfig {
  key: RouteId;
  path: (param?: string) => string;
  display: string;
  type: 'page' | 'dialog';
  requiresParam?: boolean;
}

export const NAVBAR_ROUTES_NO_AUTH: RouteConfig[] = [
  {
    key: 'home',
    path: () => ROUTE.home,
    display: 'Home',
    type: 'page',
  },
  {
    key: 'login',
    path: () => ROUTE.login,
    display: 'Sign In',
    type: 'dialog',
  },
  {
    key: 'register',
    path: () => ROUTE.register,
    display: 'Sign Up',
    type: 'dialog',
  },
];

const NAVBAR_ROUTES_AUTH: RouteConfig[] = [
  {
    key: 'home',
    path: () => ROUTE.home,
    display: 'Home',
    type: 'page',
  },
  {
    key: 'profile',
    path: (username?: string) => ROUTE.profile(username),
    display: 'My Content',
    type: 'page',
    requiresParam: true,
  },
  {
    key: 'editor',
    path: (slug?: string) => ROUTE.editor(slug),
    display: 'New Article',
    type: 'page',
    requiresParam: false,
  },
  {
    key: 'settings',
    path: () => ROUTE.settings,
    display: 'Account',
    type: 'page',
  },
];

export default function Header() {
  const location = useLocation();
  const { hasToken } = useAuth();
  const { user } = useUser();

  const routes = hasToken ? NAVBAR_ROUTES_AUTH : NAVBAR_ROUTES_NO_AUTH;

  return (
    <nav className={styles.container}>
      <div className={styles.widthContainer}>
        <Link to={ROUTE.home}>
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
        </div>
      </div>
    </nav>
  );
}
