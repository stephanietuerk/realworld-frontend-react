import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useParams } from 'react-router';
import { useApiGet } from '../api/useApiGet';
import { useUser } from '../api/useUser';
import { NONE_TAG } from '../features/feed/feed-controls/tag-options/TagOptions';
import { API_ROOT } from '../shared/constants/api';
import type {
  ArticleMetadata,
  ArticlesContextType,
  FeedSelections,
  ProfileFeed,
  RawArticleMetadata,
} from '../shared/types/articles.types';
import { dateifyResponse, sortResponsesByDate } from '../api/dateify';

interface ApiArticles {
  articles: RawArticleMetadata[];
  articlesCount: number;
}

interface ArticlesProviderProps {
  feedControlsDefaults: FeedSelections;
  children: ReactNode;
}

type ArticlesEndpoint = 'global' | 'user';

const ARTICLES_ENDPOINT: Record<ArticlesEndpoint, string> = {
  global: 'articles',
  user: 'articles/feed',
};

export const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined,
);

function getSortedArticles(data: ApiArticles): ArticleMetadata[] {
  return sortResponsesByDate(data.articles.map((a) => dateifyResponse(a)));
}

function getFilteredArticles(
  articles: ArticleMetadata[],
  feedSelections: FeedSelections,
): ArticleMetadata[] {
  return articles.filter((a) => {
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

export function ArticlesProvider({
  feedControlsDefaults,
  children,
}: ArticlesProviderProps) {
  const { user } = useUser();
  const { username } = useParams();
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [feedSelections, setFeedSelections] =
    useState<FeedSelections>(feedControlsDefaults);
  const [showLoading, setShowLoading] = useState(false);
  const [pendingArticles, setPendingArticles] = useState<
    ArticleMetadata[] | null
  >(null);

  const url = useMemo(() => {
    const endpointType = isUsersFeed(feedSelections.feed) ? 'user' : 'global';
    let url = API_ROOT + ARTICLES_ENDPOINT[endpointType];
    if (isProfileView(feedSelections.feed) && username) {
      url += `?${feedSelections.feed}=${encodeURIComponent(username)}`;
    }
    return url;
  }, [feedSelections, username, user]);

  const { data, isLoading, refetch } = useApiGet<ApiArticles>({ url });

  const filteredArticles = useMemo(
    () => getFilteredArticles(pendingArticles ?? articles, feedSelections),
    [pendingArticles, articles, feedSelections],
  );

  useEffect(() => {
    console.log('use Articles provider');
    if (data) {
      const articles = getSortedArticles(data);
      setPendingArticles(articles);
    } else {
      setPendingArticles([]);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && pendingArticles !== null) {
      setArticles(pendingArticles);
      setPendingArticles(null);
    }
  }, [isLoading, pendingArticles]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (isLoading) {
      timeout = setTimeout(() => setShowLoading(true), 300);
    } else {
      setShowLoading(false);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        feedSelections,
        filteredArticles,
        isLoading,
        showLoading,
        refetchArticles: refetch,
        setFeedSelections,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}
