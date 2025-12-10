import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import type { Article, RawFeed } from '../shared/types/feed.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useFavorite(slug: string) {
  const qc = useQueryClient();
  const key = ['articles', 'favorite', slug];

  return useMutation<
    { article: Article },
    AppError,
    'add' | 'remove',
    { prevArticle: Article | undefined }
  >({
    mutationKey: key,
    onMutate: async (action) => {
      await qc.cancelQueries({ queryKey: queryKeys.feedAll() });
      await qc.cancelQueries({ queryKey: queryKeys.article(slug) });

      const increment = action === 'add' ? +1 : -1;

      const cachedArticle = qc.getQueryData<Article>(queryKeys.article(slug));

      if (cachedArticle) {
        qc.setQueryData<Article>(queryKeys.article(slug), {
          ...cachedArticle,
          favorited: action === 'add',
          favoritesCount: Math.max(0, cachedArticle.favoritesCount + increment),
        });
      }

      qc.setQueriesData<RawFeed>({ queryKey: queryKeys.feedAll() }, (list) => {
        if (!list || !list.articles) return list;
        const articles = list.articles.map((item) =>
          item.slug === slug
            ? {
                ...item,
                favorited: action === 'add',
                favoritesCount: Math.max(0, item.favoritesCount + increment),
              }
            : item,
        );
        return {
          articles,
          articlesCount: list.articlesCount,
        };
      });

      return { prevArticle: cachedArticle };
    },
    mutationFn: (action) => {
      return callApiWithAuth(`${API_ROOT}/articles/${slug}/favorite`, {
        method: action === 'add' ? 'POST' : 'DELETE',
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.feedAll() });
      qc.invalidateQueries({ queryKey: queryKeys.article(slug) });
    },
    onError: (_error, _variables, context) => {
      console.warn('useFavorite mutation failed');
      if (context?.prevArticle) {
        qc.setQueryData(queryKeys.article(slug), context.prevArticle);
      }
    },
  });
}
