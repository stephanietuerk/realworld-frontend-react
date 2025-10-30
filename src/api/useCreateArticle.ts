import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API_ROOT } from '../shared/constants/api';
import { ROUTE } from '../shared/constants/routing';
import type { AppError } from '../shared/types/errors.types';
import type { Article, ValidArticleMutation } from '../shared/types/feed.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useCreateArticle() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation<{ article: Article }, AppError, ValidArticleMutation>({
    mutationKey: ['article', 'create'],
    mutationFn: (article) =>
      callApiWithAuth(`${API_ROOT}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article,
        }),
      }),
    onSuccess: ({ article }) => {
      navigate(ROUTE.article(article.slug));
      qc.invalidateQueries({ queryKey: queryKeys.feedAll() });
    },
  });
}
