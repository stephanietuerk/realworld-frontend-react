import type { HomeFeed, ProfileFeed } from '../types/feed.types';

export function buildArticlesUrl({
  apiRoot,
  endpointType, // 'global' | 'loggedInUser'
  feed, // 'global' | 'following' | 'author' | 'favorited'
  username, // profile username (if viewing a profile)
  tag, // currently selected tag (string | undefined)
  page, // 1-based page index
  pageSize = 10, // default page size
}: {
  apiRoot: string;
  endpointType: 'global' | 'loggedInUser';
  feed: HomeFeed | ProfileFeed;
  username?: string;
  tag?: string;
  page: number;
  pageSize?: number;
}) {
  const path = endpointType === 'loggedInUser' ? 'articles/feed' : 'articles';
  const params = new URLSearchParams();

  // Pagination
  params.set('limit', String(pageSize));
  params.set('offset', String((page - 1) * pageSize));

  // Filters (RealWorld spec)
  // Profile views
  if (feed === 'author' && username) params.set('author', username);
  if (feed === 'favorited' && username) params.set('favorited', username);

  // Tag filter (only makes sense on global/community)
  if (tag && tag !== 'NONE') params.set('tag', tag);

  return `${apiRoot}/${path}?${params.toString()}`;
}
