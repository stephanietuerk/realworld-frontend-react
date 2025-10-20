import { useContext } from 'react';
import { ArticleContext } from '../context/ArticleProvider';
import type { ArticleContextType } from '../shared/types/feed.types';

export function useArticle(): ArticleContextType {
  const ctx = useContext(ArticleContext);
  if (!ctx) throw new Error('useArticle must be used within articleProvider');
  return ctx;
}
