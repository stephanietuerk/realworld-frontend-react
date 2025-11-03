import type { HomeFeed, ProfileFeed } from '../types/feed.types';

export function buildArticlesUrl({
  apiRoot,
  endpointType, // 'global' | 'loggedInUser'
  feed, // 'global' | 'following' | 'author' | 'favorited'
  username, // profile username (if viewing a profile)
  tags, // currently selected tags (string[] | undefined)
  page, // 1-based page index
  pageSize = 10, // default page size
}: {
  apiRoot: string;
  endpointType: 'global' | 'loggedInUser';
  feed: HomeFeed | ProfileFeed;
  username?: string;
  tags?: string[];
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

  if (tags && tags.length > 0) params.set('tags', tags.join(','));

  return `${apiRoot}/${path}?${params.toString()}`;
}
