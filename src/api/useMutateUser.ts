import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { ApiError } from '../shared/types/errors.types';
import type { AuthenticatedUser, UserUpdate } from '../shared/types/user.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useMutateUser(username: string) {
  const qc = useQueryClient();

  return useMutation<{ user: AuthenticatedUser }, ApiError, UserUpdate>({
    mutationKey: ['user', 'edit', username],
    mutationFn: (user) =>
      callApiWithAuth(`${API_ROOT}user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
        }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.loggedInUser() });
      qc.invalidateQueries({ queryKey: queryKeys.profile(username) });
    },
  });
}
