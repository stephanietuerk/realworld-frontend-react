import { useEffect, useState, type ReactNode } from 'react';
import { AuthContext } from './auth-context';

function localStorageHasToken(): boolean {
  return !!localStorage.getItem('token');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorageHasToken());

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    const handler = () => setIsLoggedIn(localStorageHasToken());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
