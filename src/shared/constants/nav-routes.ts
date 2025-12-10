import { ROUTE, type RouteId } from '../constants/routing';

interface RouteConfig {
  key: RouteId;
  path: (param?: string) => string;
  display: string;
  type: 'page' | 'dialog';
}

export const NAVBAR_ROUTES_NO_AUTH: RouteConfig[] = [
  {
    key: 'explore',
    path: () => ROUTE.explore,
    display: 'Explore',
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

export const NAVBAR_ROUTES_AUTH: RouteConfig[] = [
  {
    key: 'explore',
    path: () => ROUTE.explore,
    display: 'Explore',
    type: 'page',
  },
  {
    key: 'articleNew',
    path: () => ROUTE.articleNew,
    display: 'Write',
    type: 'page',
  },
];
