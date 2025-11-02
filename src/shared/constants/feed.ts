import type { FeedOption } from '../types/feed.types';
import { ROUTE } from './routing';

export type FeedType = 'home' | 'profile';

export const NO_ARTICLES_ACTION_MARKER = '__ACTION__';

export const FEED_OPTIONS: Record<FeedType, FeedOption[]> = {
  home: [
    {
      display: 'Conduit Community',
      id: 'community',
      emptyState: {
        title: 'No articles found',
        body: () => [
          "It looks like the Conduit community may be on a writers' strike.",
        ],
      },
    },
    {
      display: 'Accounts I Follow',
      id: 'following',
      emptyState: {
        title: 'No articles yet',
        body: () => [
          "It looks like you haven't followed any accounts yet.",
          `Why not ${NO_ARTICLES_ACTION_MARKER} and follow some authors?`,
        ],
        action: {
          text: 'explore the Conduit community',
          route: ROUTE.explore,
        },
      },
    },
  ],
  profile: [
    {
      display: 'Own Articles',
      id: 'author',
      emptyState: {
        title: 'No articles yet',
        body: () => [
          "It looks like you haven't written any articles yet.",
          `Why not ${NO_ARTICLES_ACTION_MARKER}?`,
        ],
        action: {
          text: 'write your first article',
          route: ROUTE.articleNew,
        },
      },
    },
    {
      display: 'Favorites',
      id: 'favorited',
      emptyState: {
        title: 'No favorited articles',
        body: ({ username, isLoggedInUser }) => [
          `It looks like ${username ? username + " haven't" : "this user hasn't"} favorited anything yet.`,
          isLoggedInUser
            ? `Why not ${NO_ARTICLES_ACTION_MARKER} and favorite an article?`
            : undefined,
        ],
        action: {
          text: 'explore the Conduit community',
          route: ROUTE.explore,
        },
      },
    },
  ],
};
