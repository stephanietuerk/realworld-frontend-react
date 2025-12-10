import type { QueryObserverResult } from '@tanstack/react-query';
import { createContext } from 'react';
import type { AppError } from '../shared/types/errors.types';
import type { AuthenticatedUser } from '../shared/types/user.types';

export interface UserContextType {
  user?: AuthenticatedUser;
  isPending: boolean;
  isError: boolean;
  error: AppError | null;
  refetch: () => Promise<QueryObserverResult<AuthenticatedUser, AppError>>;
}

export const AuthenticatedUserContext = createContext<
  UserContextType | undefined
>(undefined);
