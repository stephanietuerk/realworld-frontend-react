import { API_ROOT } from '../shared/constants/api';
import type { Profile } from '../shared/types/articles.types';
import { useApiGet, type ApiGetState } from './useApiGet';

interface ProfileState extends Omit<ApiGetState<Profile>, 'data'> {
  profile: Profile | null;
}

export function useProfile(username: string | undefined): ProfileState {
  const { data, isLoading, error, refetch } = useApiGet<{ profile: Profile }>({
    url: !!username ? `${API_ROOT}profiles/${username}` : null,
  });

  return { profile: data?.profile ?? null, isLoading, error, refetch };
}
