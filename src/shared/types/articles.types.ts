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

export interface RawArticleMetadata
  extends Omit<ArticleMetadata, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface Article extends ArticleMetadata {
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

export interface ArticlesContextType {
  articles: ArticleMetadata[];
  feedSelections: FeedSelections;
  filteredArticles: ArticleMetadata[];
  isLoading: boolean;
  showLoading: boolean;
  refetchArticles: () => void;
  setFeedSelections: Dispatch<SetStateAction<FeedSelections>>;
}

export interface ArticleContextType {
  article: Article;
  isLoading: boolean;
  refetchArticle: () => void;
}

export interface BaseArticleMutation {
  title: string;
  description: string;
  body: string;
}

export interface ValidArticleMutation extends BaseArticleMutation {
  tagList: string[];
}
