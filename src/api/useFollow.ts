import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import type { Profile } from '../shared/types/feed.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useFollow(username: string) {
  const qc = useQueryClient();

  return useMutation<
    { profile: Profile },
    AppError,
    'add' | 'remove',
    { prevProfile: Profile | undefined }
  >({
    mutationKey: ['profile', 'follow', username],
    onMutate: async (action) => {
      await qc.cancelQueries({ queryKey: queryKeys.profile(username) });
      const cachedProfile = qc.getQueryData<Profile>(
        queryKeys.profile(username),
      );

      if (cachedProfile) {
        qc.setQueryData<Profile>(queryKeys.profile(username), {
          ...cachedProfile,
          following: action === 'add',
        });
      }

      return { prevProfile: cachedProfile };
    },
    mutationFn: (action) =>
      callApiWithAuth(`${API_ROOT}/profiles/${username}/follow`, {
        method: action === 'add' ? 'POST' : 'DELETE',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.profile(username) });
    },
    onError: (_error, _variables, context) => {
      console.warn('useFollow mutation failed');
      if (context?.prevProfile) {
        qc.setQueryData(queryKeys.profile(username), context.prevProfile);
      }
    },
  });
}
