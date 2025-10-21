import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API_ROOT } from '../shared/constants/api';
import { ROUTE } from '../shared/constants/routing';
import type { ApiError } from '../shared/types/errors.types';
import type { Article, ValidArticleMutation } from '../shared/types/feed.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useEditArticle(slug: string) {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<{ article: Article }, ApiError, ValidArticleMutation>({
    mutationKey: ['article', 'edit', slug],
    mutationFn: (edits) =>
      callApiWithAuth(`${API_ROOT}/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article: edits,
        }),
      }),
    onSuccess: ({ article }) => {
      qc.invalidateQueries({ queryKey: queryKeys.article(slug) });
      qc.invalidateQueries({ queryKey: ['feed'] });
      navigate(ROUTE.article(article.slug));
    },
  });
}
