import { createContext, useEffect, useState, type ReactNode } from 'react';
import { useApiGet } from '../api/useApiGet';
import { useAuth } from '../api/useAuth';
import { API_ROOT } from '../shared/constants/api';
import type { AuthenticatedUser } from '../shared/types/user.types';

interface UserContextType {
  user: AuthenticatedUser | null;
  isLoading: boolean;
  setUser: (user: AuthenticatedUser | null) => void;
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
  const { data, isLoading } = useApiGet<{ user: AuthenticatedUser }>({
    url: isLoggedIn ? `${API_ROOT}user` : null,
  });
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setUser(null);
      return;
    }
    setUser(data?.user ?? null);
  }, [data, isLoggedIn]);

  return (
    <AuthenticatedUserContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
