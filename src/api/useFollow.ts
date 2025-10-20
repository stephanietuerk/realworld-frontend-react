import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { ApiError } from '../shared/types/errors.types';
import type { Profile } from '../shared/types/feed.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useFollow(username: string) {
  const qc = useQueryClient();

  return useMutation<{ profile: Profile }, ApiError, 'add' | 'remove'>({
    mutationKey: ['profile', 'follow', username],
    mutationFn: (action) =>
      callApiWithAuth(`${API_ROOT}profiles/${username}/follow`, {
        method: action === 'add' ? 'POST' : 'DELETE',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.profile(username) });
    },
  });
}
