import { API_ROOT } from '../shared/constants/api';
import type { ApiCallState } from './callApiWithAuth';
import { useApiMutation } from './useApiMutation';

export function useDeleteComment(
  slug: string | undefined,
  id: number | undefined,
  onSuccess: () => void,
): ApiCallState {
  const { isLoading, error } = useApiMutation({
    url:
      !!slug && id !== undefined && id !== null
        ? `${API_ROOT}articles/${slug}/comments/${id}`
        : null,
    method: 'DELETE',
    onSuccess,
  });

  return { isLoading, error };
}
