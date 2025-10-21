import type { FeedEndpoint } from '../context/FeedProvider';
import type { HomeFeed, ProfileFeed } from '../shared/types/feed.types';

export const queryKeys = {
  comments: (slug: string) => ['comments', slug],
  feed: ({
    endpointType,
    feed,
    username,
  }: {
    endpointType: FeedEndpoint;
    feed: HomeFeed | ProfileFeed;
    username?: string;
  }) => ['feed', endpointType, feed, username],
  feedAll: () => ['feed'],
  article: (slug: string) => ['article', slug],
  loggedInUser: () => ['loggedInUser'],
  profile: (username?: string) => ['profile', username],
};
