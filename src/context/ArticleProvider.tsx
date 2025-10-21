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
  const [article, setArticle] = useState<Article>({} as Article);

  const { data, isLoading, refetch } = useApiGet<
    { article: RawArticle },
    Article
  >({
    queryKey: queryKeys.article(slug),
    url: slug ? `${API_ROOT}/articles/${slug}` : undefined,
    queryOptions: {
      select: ({ article }) => dateifyResponse(article),
    },
  });

  useEffect(() => {
    if (!data) return;

    mdToHtml(data.body)
      .then((body) =>
        setArticle({
          ...data,
          body: body,
          bodyMarkdown: data.body,
        }),
      )
      .catch((err) => {
        console.error('Failed to convert article body:', err);
        setArticle({} as Article);
      });
  }, [data?.slug, data?.body]);

  return (
    <ArticleContext.Provider
      value={{
        article,
        isLoading,
        refetchArticle: refetch,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}
