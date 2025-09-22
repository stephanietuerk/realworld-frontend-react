import { API_ROOT } from '../shared/constants/api';
import type { AuthenticatedUser, UserUpdate } from '../shared/types/user.types';
import type { ApiCallState } from './callApiWithAuth';
import { useApiMutation } from './useApiMutation';

interface MutateUserState extends ApiCallState {
  user: AuthenticatedUser | null;
}

interface MutateUserParams {
  body: UserUpdate | undefined;
  onSuccess: () => void;
  method: 'POST' | 'PUT';
}

export function useMutateUser({
  body,
  onSuccess,
  method,
}: MutateUserParams): MutateUserState {
  const { data, isLoading, error } = useApiMutation<{
    user: AuthenticatedUser;
  }>({
    url: !!body ? `${API_ROOT}user` : null,
    method,
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
