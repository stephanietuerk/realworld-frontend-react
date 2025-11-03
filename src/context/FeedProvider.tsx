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
import { buildArticlesUrl } from '../shared/utilities/url-utilities';

export interface RawFeed {
  articles: RawFeedItem[];
  articlesCount: number;
}

interface FeedProviderProps {
  feedControlsDefaults: FeedSelections;
  children: ReactNode;
}

export type FeedEndpoint = 'global' | 'loggedInUser';

const FEED_PAGE_SIZE = 2;

export const FeedContext = createContext<FeedContextType | undefined>(
  undefined,
);

function getSortedItems(items: RawFeedItem[]): FeedItem[] {
  return sortResponsesByDate(items.map((a) => dateifyResponse(a)));
}

function isUsersFeed(feed: FeedSelections['feed']) {
  return feed === 'following';
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
  const [page, setPage] = useState<number>(1);

  const endpointType = getEndpointType(feedSelections.feed);

  const url = useMemo(() => {
    return buildArticlesUrl({
      apiRoot: API_ROOT,
      endpointType,
      feed: feedSelections.feed,
      username,
      tags: feedSelections.tags.filter((t) => t !== NONE_TAG),
      page,
      pageSize: FEED_PAGE_SIZE,
    });
  }, [endpointType, feedSelections.feed, feedSelections.tags, username, page]);

  const { data, isPending, refetch } = useApiGet<
    RawFeed,
    { items: FeedItem[]; total: number }
  >({
    queryKey: queryKeys.feed({
      endpointType,
      feed: feedSelections.feed,
      username,
      page,
      tag: feedSelections.tags?.join(',') ?? '',
    }),
    url,
    queryOptions: {
      select: ({ articles, articlesCount }) => ({
        items: getSortedItems(articles),
        total: articlesCount,
      }),
      staleTime: 0,
      gcTime: 0,
    },
  });

  const filteredItems = data?.items ?? [];
  const totalPages = Math.max(
    1,
    Math.ceil((data?.total ?? 0) / FEED_PAGE_SIZE),
  );
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <FeedContext.Provider
      value={{
        allItems: data?.items,
        feedSelections,
        filteredItems,
        isPending,
        refetch,
        setFeedSelections,
        canNext,
        canPrev,
        page,
        pageSize: FEED_PAGE_SIZE,
        setPage,
        totalCount: data?.total ?? 0,
        totalPages,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}
