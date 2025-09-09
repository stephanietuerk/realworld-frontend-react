import { API_ROOT } from '../shared/constants/api';
import type { Profile } from '../shared/types/articles.types';
import { useApiWithAuth } from './callApiWithAuth';

function getEndpoint(username: string): string {
  return `${API_ROOT}profiles/${username}/follow`;
}

export function useFollowActions() {
  const callApiWithAuth = useApiWithAuth();

  const followUser = async (username: string) => {
    return callApiWithAuth<{ profile: Profile }>(getEndpoint(username), {
      method: 'POST',
    });
  };

  const unfollowUser = async (username: string) => {
    return callApiWithAuth<{ profile: Profile }>(getEndpoint(username), {
      method: 'DELETE',
    });
  };

  return { followUser, unfollowUser };
}
