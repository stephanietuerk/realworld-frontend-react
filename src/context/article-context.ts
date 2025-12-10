import { createContext } from 'react';
import type { ArticleContextType } from '../shared/types/feed.types';

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined,
);
