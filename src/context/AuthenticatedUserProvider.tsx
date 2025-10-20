import type { QueryObserverResult } from '@tanstack/react-query';
import { createContext, type ReactNode } from 'react';
import { queryKeys } from '../api/queryKeys';
import { useApiGet } from '../api/useApiGet';
import { useAuth } from '../api/useAuth';
import { API_ROOT } from '../shared/constants/api';
import type { ApiError } from '../shared/types/errors.types';
import type { AuthenticatedUser } from '../shared/types/user.types';

interface UserContextType {
  user?: AuthenticatedUser;
  isPending: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => Promise<QueryObserverResult<AuthenticatedUser, ApiError>>;
}

export const AuthenticatedUserContext = createContext<
  UserContextType | undefined
>(undefined);

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
    url: isLoggedIn ? `${API_ROOT}user` : undefined,
    queryOptions: {
      select: ({ user }) => user,
    },
  });

  const user = isLoggedIn ? (data ?? undefined) : undefined;

  return (
    <AuthenticatedUserContext.Provider
      value={{ user, isPending, isError, error, refetch }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
