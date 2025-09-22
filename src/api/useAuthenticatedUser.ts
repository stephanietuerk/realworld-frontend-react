import { useContext } from 'react';
import { AuthenticatedUserContext } from '../context/AuthenticatedUserProvider';

export function useAuthenticatedUser() {
  const ctx = useContext(AuthenticatedUserContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
