import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useDeleteComment(slug: string) {
  const qc = useQueryClient();

  return useMutation<void, AppError, number>({
    mutationKey: ['comments', 'delete'],
    mutationFn: (id) =>
      callApiWithAuth(`${API_ROOT}/articles/${slug}/comments/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.comments(slug) }),
  });
}
