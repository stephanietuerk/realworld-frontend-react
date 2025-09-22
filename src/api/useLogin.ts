import { API_ROOT } from '../shared/constants/api';
import type { AuthenticatedUser, UserLogin } from '../shared/types/user.types';
import type { ApiCallState } from './callApiWithAuth';
import { useApiMutation } from './useApiMutation';

interface LoginUserState extends ApiCallState {
  user: AuthenticatedUser | null;
}

interface LoginUserParams {
  body: UserLogin | undefined;
  onSuccess: () => void;
}

export function useLoginUser({
  body,
  onSuccess,
}: LoginUserParams): LoginUserState {
  const { data, isLoading, error } = useApiMutation<{
    user: AuthenticatedUser;
  }>({
    url: !!body ? `${API_ROOT}users/login` : null,
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
