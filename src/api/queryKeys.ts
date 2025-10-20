import type { UserLogin } from '../shared/types/user.types';

export const queryKeys = {
  login: (user?: UserLogin) => ['login', user?.email, user?.password],
  comments: (slug: string) => ['comments', slug],
  feed: ({
    endpointType,
    username,
  }: {
    endpointType: 'global' | 'user';
    username?: string;
  }) => ['feed', endpointType, username],
  feedAll: () => ['feed'],
  article: (slug: string) => ['article', slug],
  loggedInUser: () => ['loggedInUser'],
  profile: (username?: string) => ['profile', username],
};
