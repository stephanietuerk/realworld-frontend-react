import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '../api/authenticate';
import { useApiGet } from '../api/useApiGet';
import { useAuth } from '../api/useAuth';
import { API_ROOT } from '../shared/constants/api';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const { hasToken } = useAuth();
  const { data, isLoading } = useApiGet<{ user: User }>({
    url: hasToken ? `${API_ROOT}user` : null,
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(data?.user ?? null);
  }, [data]);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
