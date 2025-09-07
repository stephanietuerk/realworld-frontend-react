import { createContext, useEffect, useState, type ReactNode } from 'react';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { useApiClient } from '../api/useApiClient';
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
  const { useApiWithAuth: callApiWithAuth } = useApiClient();
  const [article, setArticle] = useState<Article>({} as Article);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchArticle = async () => {
    if (!slug) return;

    setIsLoading(true);
    const url = API_ROOT + 'articles/' + slug;

    try {
      const data = await callApiWithAuth<{ article: Article }>(url);
      const article = getTypedArticle(data.article);

      const body = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(article.body);

      setArticle({
        ...article,
        body: body.toString(),
      });
    } catch (error) {
      console.log('Error in useArticle:', error);
      setArticle({} as Article);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  return (
    <ArticleContext.Provider
      value={{
        article,
        isLoading,
        syncApi: fetchArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}
