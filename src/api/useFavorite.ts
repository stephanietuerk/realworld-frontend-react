import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { RawFeed } from '../context/FeedProvider';
import { API_ROOT } from '../shared/constants/api';
import type { ApiError } from '../shared/types/errors.types';
import type { Article } from '../shared/types/feed.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useFavorite(slug: string) {
  const qc = useQueryClient();
  const key = ['articles', 'favorite', slug];

  return useMutation<{ article: Article }, ApiError, 'add' | 'remove'>({
    mutationKey: key,
    mutationFn: (action) =>
      callApiWithAuth(`${API_ROOT}articles/${slug}/favorite`, {
        method: action === 'add' ? 'POST' : 'DELETE',
      }),
    onMutate: async (action) => {
      await qc.cancelQueries({ queryKey: queryKeys.feedAll() });
      await qc.cancelQueries({ queryKey: queryKeys.article(slug) });

      const increment = action === 'add' ? +1 : -1;

      const prevArticle = qc.getQueryData<Article>(queryKeys.article(slug));

      if (prevArticle) {
        qc.setQueryData<Article>(queryKeys.article(slug), {
          ...prevArticle,
          favorited: action === 'add',
          favoritesCount: Math.max(0, prevArticle.favoritesCount + increment),
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

      return { prevArticle };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['feed'] });
      qc.invalidateQueries({ queryKey: queryKeys.article(slug) });
    },
  });
}
