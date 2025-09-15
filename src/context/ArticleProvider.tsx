import { createContext, useEffect, useState, type ReactNode } from 'react';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { useApiGet } from '../api/useApiGet';
import { API_ROOT } from '../shared/constants/api';
import type {
  Article,
  ArticleContextType,
  RawArticle,
} from '../shared/types/articles.types';
import { dateifyResponse } from '../api/dateify';

interface ArticleProviderProps {
  slug: string;
  children: ReactNode;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined,
);

export function ArticleProvider({ slug, children }: ArticleProviderProps) {
  const [article, setArticle] = useState<Article>({} as Article);
  const { data, isLoading, refetch } = useApiGet<{ article: RawArticle }>({
    url: slug ? `${API_ROOT}articles/${slug}` : null,
  });

  useEffect(() => {
    if (!data) return;

    const typedResponse = dateifyResponse<RawArticle, Article>(data.article);
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(typedResponse.body)
      .then((body) =>
        setArticle({
          ...typedResponse,
          body: body.toString(),
        }),
      )
      .catch((err) => {
        console.error('Failed to convert article body:', err);
        setArticle({} as Article);
      });
  }, [data]);

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
