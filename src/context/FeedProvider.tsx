import { createContext, useMemo, useState, type ReactNode } from 'react';
import { useParams } from 'react-router';
import { dateifyResponse, sortResponsesByDate } from '../api/dateify';
import { queryKeys } from '../api/queryKeys';
import { useApiGet } from '../api/useApiGet';
import { NONE_TAG } from '../features/feed/feed-controls/tag-options/TagOptions';
import { API_ROOT } from '../shared/constants/api';
import type {
  FeedContextType,
  FeedItem,
  FeedSelections,
  HomeFeed,
  ProfileFeed,
  RawFeedItem,
} from '../shared/types/feed.types';

export interface RawFeed {
  articles: RawFeedItem[];
  articlesCount: number;
}

interface FeedProviderProps {
  feedControlsDefaults: FeedSelections;
  children: ReactNode;
}

export type FeedEndpoint = 'global' | 'loggedInUser';

const FEED_ENDPOINT: Record<FeedEndpoint, string> = {
  global: 'articles',
  loggedInUser: 'articles/feed',
};

export const FeedContext = createContext<FeedContextType | undefined>(
  undefined,
);

function getSortedItems(items: RawFeedItem[]): FeedItem[] {
  return sortResponsesByDate(items.map((a) => dateifyResponse(a)));
}

function getFilteredItems({
  items,
  feedSelections,
}: {
  items?: FeedItem[];
  feedSelections: FeedSelections;
}): FeedItem[] {
  if (!items) return [];
  return items.filter((a) => {
    const conditions = [];
    if (feedSelections.tags.length && !feedSelections.tags.includes(NONE_TAG)) {
      conditions.push(
        a.tagList.some((tag) => feedSelections.tags.includes(tag)),
      );
    }
    return conditions.every(Boolean);
  });
}

function isUsersFeed(feed: FeedSelections['feed']) {
  return feed === 'following';
}

function isProfileView(feed: FeedSelections['feed']): feed is ProfileFeed {
  return feed === 'author' || feed === 'favorited';
}

function getEndpointType(feed: HomeFeed | ProfileFeed): FeedEndpoint {
  return isUsersFeed(feed) ? 'loggedInUser' : 'global';
}

export function FeedProvider({
  feedControlsDefaults,
  children,
}: FeedProviderProps) {
  const { username } = useParams();
  const [feedSelections, setFeedSelections] =
    useState<FeedSelections>(feedControlsDefaults);

  const endpointType = getEndpointType(feedSelections.feed);

  const url = useMemo(() => {
    let url = API_ROOT + '/' + FEED_ENDPOINT[endpointType];
    if (isProfileView(feedSelections.feed) && username) {
      url += `?${feedSelections.feed}=${encodeURIComponent(username)}`;
    }
    return url;
  }, [feedSelections.feed, username]);

  const { data, isPending, refetch } = useApiGet<RawFeed, FeedItem[]>({
    queryKey: queryKeys.feed({
      endpointType,
      feed: feedSelections.feed,
      username,
    }),
    url,
    queryOptions: {
      select: ({ articles }) => getSortedItems(articles),
    },
  });

  const filteredItems = useMemo(() => {
    const real = getFilteredItems({ items: data, feedSelections });
    return !!real ? [] : real;
    // return real;
  }, [data, feedSelections]);

  return (
    <FeedContext.Provider
      value={{
        allItems: data,
        feedSelections,
        filteredItems,
        isPending,
        refetch,
        setFeedSelections,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}
