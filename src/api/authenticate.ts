import { API_ROOT } from '../shared/constants/api';
import type { AuthenticatedUser } from '../shared/types/user.types';
import { callApiWithAuth } from './callApiWithAuth';

export async function login(
  email: string,
  password: string,
): Promise<{ user: AuthenticatedUser }> {
  return callApiWithAuth<{ user: AuthenticatedUser }>(
    `${API_ROOT}/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: { email: email.trim().toLowerCase(), password },
      }),
    },
    undefined,
    'none',
  );
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<{ user: AuthenticatedUser }> {
  return callApiWithAuth<{ user: AuthenticatedUser }>(
    `${API_ROOT}/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password,
        },
      }),
    },
    undefined,
    'none',
  );
}
