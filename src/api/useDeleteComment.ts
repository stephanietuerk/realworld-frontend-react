import { API_ROOT } from '../shared/constants/api';
import type { ApiCallState } from './callApiWithAuth';
import { useApiDelete } from './useApiDelete';

export function useDeleteComment(
  slug: string | undefined,
  id: number | undefined,
  onSuccess: () => void,
): ApiCallState {
  const { isLoading, error } = useApiDelete({
    url:
      !!slug && id !== undefined && id !== null
        ? `${API_ROOT}articles/${slug}/comments/${id}`
        : null,
    onSuccess,
  });

  return { isLoading, error };
}
