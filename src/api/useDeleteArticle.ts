import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useDeleteArticle(slug: string) {
  const qc = useQueryClient();

  return useMutation<void, AppError>({
    mutationKey: ['article', 'delete', slug],
    mutationFn: () =>
      callApiWithAuth(`${API_ROOT}/articles/${slug}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.article(slug) });
      qc.invalidateQueries({ queryKey: queryKeys.feedAll() });
    },
  });
}
