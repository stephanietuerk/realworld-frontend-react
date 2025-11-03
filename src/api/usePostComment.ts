import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import type { AuthenticatedUser } from '../shared/types/user.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';
import { type Comment } from './useComments';

export function usePostComment(slug: string) {
  const qc = useQueryClient();
  const commentsKey = queryKeys.comments(slug);

  return useMutation<{ comment: Comment }, AppError, string>({
    mutationKey: ['comments', 'create', slug] as const,
    onMutate: async (body) => {
      await qc.cancelQueries({ queryKey: commentsKey });

      const prevComments = qc.getQueryData<Comment[]>(commentsKey);
      const user = qc.getQueryData<AuthenticatedUser>(queryKeys.loggedInUser());

      const optimisticComment: Comment = {
        id: Math.random(),
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          username: user?.username ?? 'You',
          bio: user?.bio,
          image: user?.image,
          following: false,
        },
      } as Comment;

      qc.setQueryData<Comment[]>(commentsKey, (old) =>
        Array.isArray(old) ? [optimisticComment, ...old] : [optimisticComment],
      );

      return { previous: prevComments };
    },
    mutationFn: (body) => {
      console.log('🚀 mutationFn called with', body);
      return callApiWithAuth(`${API_ROOT}/articles/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: { body } }),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commentsKey });
    },
  });
}
