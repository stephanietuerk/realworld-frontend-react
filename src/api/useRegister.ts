import { useMutation } from '@tanstack/react-query';
import { useCloseModal } from '../features/auth-modal/useCloseModal';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import type {
  AuthenticatedUser,
  UserRegistration,
} from '../shared/types/user.types';
import { callApiWithAuth } from './callApiWithAuth';

export function useRegisterUser(setToken: (token: string | null) => void) {
  const closeModal = useCloseModal();

  return useMutation<
    {
      user: AuthenticatedUser;
    },
    AppError,
    UserRegistration
  >({
    mutationKey: ['register'],
    mutationFn: (registration) =>
      callApiWithAuth(`${API_ROOT}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: registration,
        }),
      }),
    onSuccess: ({ user }) => {
      setToken(user.token);
      closeModal();
    },
  });
}
