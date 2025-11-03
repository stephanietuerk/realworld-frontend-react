import type { FeedOption } from '../types/feed.types';
import { ROUTE } from './routing';

export type FeedType = 'home' | 'profile';

export const NO_ARTICLES_ACTION_MARKER = '__ACTION__';

export const exploreCTA = {
  text: 'Explore the Conduit community',
  route: ROUTE.explore,
};

export const writeCTA = {
  text: 'Write an article',
  route: ROUTE.articleNew,
};

export const FEED_OPTIONS: Record<FeedType, FeedOption[]> = {
  home: [
    {
      display: 'Conduit Community',
      id: 'community',
      emptyState: {
        notLoggedIn: () => ({
          title: 'No articles found',
          body: ['There are no published articles yet.', 'Check back soon.'],
        }),
        loggedIn: () => ({
          title: 'No articles found',
          body: [
            'There are no published articles yet.',
            'Why not write the first one?',
          ],
          action: writeCTA,
        }),
      },
    },
    {
      display: 'Accounts I Follow',
      id: 'following',
      emptyState: {
        loggedIn: () => ({
          title: 'No articles yet',
          body: [
            "You haven't followed any accounts yet.",
            'Why not read some articles from the community?',
          ],
          action: exploreCTA,
        }),
      },
    },
  ],
  profile: [
    {
      display: 'Own Articles',
      id: 'author',
      emptyState: {
        notLoggedIn: () => ({
          title: 'No articles yet',
          body: [
            "This user hasn't written any articles yet.",
            'Why not read some articles from the community?',
          ],
          action: exploreCTA,
        }),
        loggedIn: (isLoggedInUser) => ({
          title: 'No articles yet',
          body: isLoggedInUser
            ? [
                "It looks like you haven't written any articles yet.",
                'Why not write your first one?',
              ]
            : [
                "This user hasn't written any articles yet.",
                'Why not read some articles by other users?',
              ],
          action: isLoggedInUser ? writeCTA : exploreCTA,
        }),
      },
    },
    {
      display: 'Favorites',
      id: 'favorited',
      emptyState: {
        notLoggedIn: () => ({
          title: 'No favorited articles',
          body: ["This user hasn't favorited anything yet."],
          action: {
            text: 'explore the Conduit community',
            route: ROUTE.explore,
          },
        }),
        loggedIn: (isLoggedInUser) => ({
          title: 'No favorited articles',
          body: isLoggedInUser
            ? [
                `It looks like you haven't favorited anything yet.`,
                `Why not read some articles and favorite one you like?`,
              ]
            : ["This user hasn't favorited anything yet."],
          action: isLoggedInUser ? exploreCTA : undefined,
        }),
      },
    },
  ],
};
