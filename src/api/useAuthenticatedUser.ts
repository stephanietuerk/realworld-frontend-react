import { useContext } from 'react';
import { AuthenticatedUserContext } from '../context/authenticated-user-context';

export function useAuthenticatedUser() {
  const ctx = useContext(AuthenticatedUserContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
