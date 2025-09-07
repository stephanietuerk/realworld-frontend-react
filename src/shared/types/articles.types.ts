import type { Dispatch, SetStateAction } from 'react';

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ArticleMetadata {
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

export interface Article extends ArticleMetadata {
  body: string;
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

export interface ArticlesContextType {
  articles: ArticleMetadata[];
  feedSelections: FeedSelections;
  filteredArticles: ArticleMetadata[];
  isLoading: boolean;
  showLoading: boolean;
  syncApi: () => void;
  setFeedSelections: Dispatch<SetStateAction<FeedSelections>>;
}

export interface ArticleContextType {
  article: Article;
  isLoading: boolean;
  syncApi: () => void;
}
