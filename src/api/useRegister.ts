import { API_ROOT } from '../shared/constants/api';
import type {
  AuthenticatedUser,
  UserRegistration,
} from '../shared/types/user.types';
import type { ApiCallState } from './callApiWithAuth';
import { useApiMutation } from './useApiMutation';

interface RegisterUserState extends ApiCallState {
  user: AuthenticatedUser | null;
}

interface RegisterUserParams {
  body: UserRegistration | undefined;
  onSuccess: () => void;
}

export function useRegisterUser({
  body,
  onSuccess,
}: RegisterUserParams): RegisterUserState {
  const { data, isLoading, error } = useApiMutation<{
    user: AuthenticatedUser;
  }>({
    url: !!body ? `${API_ROOT}users` : null,
    method: 'POST',
    options: {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: body,
      }),
    },
    onSuccess,
  });

  return { user: data?.user ?? null, isLoading, error };
}
