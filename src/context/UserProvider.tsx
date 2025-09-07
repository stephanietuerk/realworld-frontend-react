import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '../api/authenticate';
import { useApiClient } from '../api/useApiClient';
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
  const { useApiWithAuth: callApiWithAuth } = useApiClient();
  const { hasToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let controller: AbortController;

  useEffect(() => {
    if (!hasToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        setIsLoading(true);
        const url = API_ROOT + 'user';
        const data = await callApiWithAuth<{ user: User }>(url, { signal });
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [hasToken]);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
