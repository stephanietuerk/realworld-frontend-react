import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import type { AuthenticatedUser, UserUpdate } from '../shared/types/user.types';
import { callApiWithAuth } from './callApiWithAuth';
import { queryKeys } from './queryKeys';

export function useEditSettings(username?: string) {
  const qc = useQueryClient();

  return useMutation<
    { user: AuthenticatedUser },
    AppError,
    UserUpdate,
    { previousUser?: AuthenticatedUser }
  >({
    mutationKey: ['user', 'edit', username ?? 'unknown'],
    onMutate: async (newData) => {
      await qc.cancelQueries({ queryKey: queryKeys.loggedInUser() });

      const previousUser = qc.getQueryData<AuthenticatedUser>(
        queryKeys.loggedInUser(),
      );

      if (previousUser) {
        const updatedUser = {
          ...previousUser,
          ...newData,
        };

        qc.setQueryData(queryKeys.loggedInUser(), updatedUser);
        qc.setQueryData(queryKeys.profile(username!), updatedUser);
      }

      return { previousUser };
    },
    mutationFn: async (user): Promise<{ user: AuthenticatedUser }> => {
      if (!username) {
        throw new Error('Username is required');
      }
      return callApiWithAuth(`${API_ROOT}/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
        }),
      });
    },
    onError: (_err, _newData, context) => {
      if (context?.previousUser) {
        qc.setQueryData(queryKeys.loggedInUser(), context.previousUser);
        qc.setQueryData(queryKeys.profile(username!), context.previousUser);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.loggedInUser() });
      qc.invalidateQueries({ queryKey: queryKeys.profile(username) });
    },
  });
}
