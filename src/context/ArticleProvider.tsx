import { createContext, useEffect, useState, type ReactNode } from 'react';
import { dateifyResponse } from '../api/dateify';
import { queryKeys } from '../api/queryKeys';
import { useApiGet } from '../api/useApiGet';
import { API_ROOT } from '../shared/constants/api';
import type {
  Article,
  ArticleContextType,
  RawArticle,
} from '../shared/types/feed.types';
import { mdToHtml } from '../shared/utilities/markdown-to-html';

interface ArticleProviderProps {
  slug: string;
  children: ReactNode;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined,
);

export function ArticleProvider({ slug, children }: ArticleProviderProps) {
  const { data: article, isLoading } = useApiGet<
    { article: RawArticle },
    Article
  >({
    queryKey: queryKeys.article(slug),
    url: slug ? `${API_ROOT}/articles/${slug}` : undefined,
    queryOptions: { select: ({ article }) => dateifyResponse(article) },
  });

  const [html, setHtml] = useState<string>();
  useEffect(() => {
    let cancelled = false;
    if (!article?.body) return;
    mdToHtml(article.body).then((b) => !cancelled && setHtml(b));
    return () => {
      cancelled = true;
    };
  }, [article?.body]);

  const value = article
    ? { ...article, body: html ?? article.body, bodyMarkdown: article.body }
    : ({} as Article);

  return (
    <ArticleContext.Provider
      value={{
        article: value,
        isLoading,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}
