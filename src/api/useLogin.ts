import { useMutation } from '@tanstack/react-query';
import { useCloseModal } from '../features/auth-modal/useCloseModal';
import { API_ROOT } from '../shared/constants/api';
import type { ApiError } from '../shared/types/errors.types';
import type { AuthenticatedUser, UserLogin } from '../shared/types/user.types';
import { callApiWithAuth } from './callApiWithAuth';

export function useLoginUser(setToken: (token: string | null) => void) {
  const closeModal = useCloseModal();

  return useMutation<
    {
      user: AuthenticatedUser;
    },
    ApiError,
    UserLogin
  >({
    mutationKey: ['login'],
    mutationFn: (login) =>
      callApiWithAuth(`${API_ROOT}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: login,
        }),
      }),
    onSuccess: ({ user }) => {
      setToken(user.token);
      closeModal();
    },
  });
}
