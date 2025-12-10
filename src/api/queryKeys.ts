import type { FeedEndpoint, HomeFeed, ProfileFeed } from '../shared/types/feed.types';

export const queryKeys = {
  comments: (slug: string) => ['comments', slug],
  feed: ({
    endpointType,
    feed,
    username,
    page,
    tag,
  }: {
    endpointType: FeedEndpoint;
    feed: HomeFeed | ProfileFeed;
    username?: string;
    page: number;
    tag?: string;
  }) => ['feed', endpointType, feed, username, page, tag],
  feedAll: () => ['feed'],
  article: (slug: string) => ['article', slug],
  loggedInUser: () => ['loggedInUser'],
  profile: (username?: string) => ['profile', username],
};
