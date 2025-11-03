import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import type { AuthenticatedUser } from '../../shared/types/user.types';

export function useOptimisticUser() {
  const { user: userQuery } = useAuthenticatedUser();
  const qc = useQueryClient();
  const optimisticUser = qc.getQueryData<AuthenticatedUser>(
    queryKeys.loggedInUser(),
  );
  return optimisticUser ?? userQuery;
}
