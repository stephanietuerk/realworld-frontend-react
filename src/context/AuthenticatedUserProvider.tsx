import { useMemo, type ReactNode } from 'react';
import { queryKeys } from '../api/queryKeys';
import { useApiGet } from '../api/useApiGet';
import { useAuth } from '../api/useAuth';
import { API_ROOT } from '../shared/constants/api';
import type { AuthenticatedUser } from '../shared/types/user.types';
import {
  AuthenticatedUserContext,
  type UserContextType,
} from './authenticated-user-context';

export function AuthenticatedUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoggedIn } = useAuth();

  const { data, isPending, refetch, isError, error } = useApiGet<
    { user: AuthenticatedUser },
    AuthenticatedUser
  >({
    queryKey: queryKeys.loggedInUser(),
    enabled: isLoggedIn,
    url: isLoggedIn ? `${API_ROOT}/user` : undefined,
    queryOptions: {
      select: ({ user }) => user,
    },
  });

  const user = useMemo(() => {
    return isLoggedIn ? (data ?? undefined) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, data?.email, data?.username, data?.token]);

  const ctxValue = useMemo<UserContextType>(() => {
    return { user, isPending, isError, error, refetch };
  }, [user, isPending, isError, error, refetch]);

  return (
    <AuthenticatedUserContext.Provider value={ctxValue}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
