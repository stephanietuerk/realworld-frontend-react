import { createContext, useEffect, useState, type ReactNode } from 'react';

interface AuthContextType {
  hasToken: boolean;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

function localStorageHasToken(): boolean {
  return !!localStorage.getItem('token');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [hasToken, setHasToken] = useState(localStorageHasToken());

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setHasToken(!!token);
  };

  useEffect(() => {
    const handler = () => setHasToken(localStorageHasToken());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <AuthContext.Provider value={{ hasToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
