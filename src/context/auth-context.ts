import { createContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
