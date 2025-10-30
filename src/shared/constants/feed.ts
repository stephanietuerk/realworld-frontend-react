import type { FeedOption } from '../types/feed.types';

export type FeedType = 'home' | 'profile';

export const FEED_OPTIONS: Record<FeedType, FeedOption[]> = {
  home: [
    {
      display: 'Conduit Community',
      id: 'community',
      noArticlesString: () =>
        "It looks like the Conduit community may be on a writers' strike. There are no articles to show.",
    },
    {
      display: 'Accounts I Follow',
      id: 'following',
      noArticlesString: () =>
        'Hmmm. It looks like you may not have followed any accounts yet.',
    },
  ],
  profile: [
    {
      display: 'Own Articles',
      id: 'author',
      noArticlesString: (username = 'this user') =>
        `It looks like ${username} may not have written anything yet. There are no articles to show.`,
    },
    {
      display: 'Favorites',
      id: 'favorited',
      noArticlesString: (username = 'this user') =>
        `Hmmm. It looks like ${username} may not have favorited anything yet.`,
    },
  ],
};
