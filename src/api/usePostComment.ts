import { API_ROOT } from '../shared/constants/api';
import type { ApiCallState } from './callApiWithAuth';
import { useApiPost } from './useApiPost';
import { type Comment } from './useComments';

interface PostCommentState extends ApiCallState {
  comment: Comment | null;
}

export function usePostComment(
  slug: string | undefined,
  body: string | undefined,
): PostCommentState {
  const { data, isLoading, error } = useApiPost<{ comment: Comment }>({
    url: !!slug ? `${API_ROOT}articles/${slug}/comments` : null,
    options: {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment: {
          body,
        },
      }),
    },
  });

  return { comment: data?.comment ?? null, isLoading, error };
}
