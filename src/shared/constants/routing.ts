export type RouteId =
  | 'explore'
  | 'login'
  | 'register'
  | 'settings'
  | 'profile'
  | 'article'
  | 'articleEdit'
  | 'articleNew';

export const ROUTE = {
  explore: '/',
  login: '/login',
  register: '/register',
  settings: '/settings',
  profile: (username = 'username') => `/profile/${username}`,
  article: (slug: string) => `/article/${slug}`,
  articleEdit: (slug: string) => `/article/${slug}/edit`,
  articleNew: '/article/new',
} as const;
