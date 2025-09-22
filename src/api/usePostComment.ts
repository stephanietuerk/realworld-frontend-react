import { API_ROOT } from '../shared/constants/api';
import type { ApiCallState } from './callApiWithAuth';
import { useApiMutation } from './useApiMutation';
import { type Comment } from './useComments';

interface PostCommentState extends ApiCallState {
  comment: Comment | null;
}

export function usePostComment(
  slug: string | undefined,
  body: string | undefined,
  onSuccess: () => void,
): PostCommentState {
  const { data, isLoading, error } = useApiMutation<{ comment: Comment }>({
    url: !!slug ? `${API_ROOT}articles/${slug}/comments` : null,
    method: 'POST',
    options: {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment: {
          body,
        },
      }),
    },
    onSuccess,
  });

  return { comment: data?.comment ?? null, isLoading, error };
}
