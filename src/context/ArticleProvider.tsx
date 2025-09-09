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
} from '../shared/types/articles.types';

interface ArticleProviderProps {
  slug: string;
  children: ReactNode;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined,
);

function getTypedArticle(article: Article): Article {
  return {
    ...article,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
  };
}

export function ArticleProvider({ slug, children }: ArticleProviderProps) {
  const [article, setArticle] = useState<Article>({} as Article);
  const { data, isLoading, refetch } = useApiGet<{ article: Article }>({
    url: slug ? `${API_ROOT}articles/${slug}` : null,
  });

  useEffect(() => {
    if (!data) return;

    const article = getTypedArticle(data.article);
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(article.body)
      .then((body) =>
        setArticle({
          ...article,
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
