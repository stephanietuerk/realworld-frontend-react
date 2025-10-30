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
  noArticlesString: (username?: string) => string;
}

export interface FeedContextType {
  allItems?: FeedItem[];
  feedSelections: FeedSelections;
  filteredItems: FeedItem[];
  isPending: boolean;
  refetch: UseQueryResult<FeedItem[], AppError>['refetch'];
  setFeedSelections: Dispatch<SetStateAction<FeedSelections>>;
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
