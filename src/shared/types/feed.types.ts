import type { UseQueryResult } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';
import type { AppError } from './errors.types';

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface FeedItem {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface RawFeedItem extends Omit<FeedItem, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface RawFeed {
  articles: RawFeedItem[];
  articlesCount: number;
}

export type FeedEndpoint = 'global' | 'loggedInUser';

export interface Article extends FeedItem {
  body: string;
  bodyMarkdown: string;
}

export interface RawArticle extends Omit<Article, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export type FeedType = 'home' | 'profile';
export type HomeFeed = 'community' | 'following';
export type ProfileFeed = 'author' | 'favorited';

export interface FeedSelections {
  feed: HomeFeed | ProfileFeed;
  tags: string[];
}

export interface FeedOption {
  display: string;
  id: HomeFeed | ProfileFeed;
  emptyState: {
    loggedIn: (isLoggedInUser?: boolean) => FeedEmptyState;
    notLoggedIn?: () => FeedEmptyState;
  };
}

export type FeedAction =
  | { text: string; route: string }
  | { text: string; onClick: () => void };

export interface FeedEmptyState {
  title: string;
  body: string[];
  action?: FeedAction;
}

export interface FeedContextType {
  allItems?: FeedItem[];
  feedSelections: FeedSelections;
  filteredItems: FeedItem[];
  isPending: boolean;
  refetch: UseQueryResult<
    { items: FeedItem[]; total: number },
    AppError
  >['refetch'];
  setFeedSelections: Dispatch<SetStateAction<FeedSelections>>;
  canNext: boolean;
  canPrev: boolean;
  page: number;
  pageSize: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  totalPages: number;
}

export interface ArticleContextType {
  article: Article;
  isLoading: boolean;
}

export interface BaseArticleMutation {
  title: string;
  description: string;
  body: string;
}

export interface ValidArticleMutation extends BaseArticleMutation {
  tagList: string[];
}
