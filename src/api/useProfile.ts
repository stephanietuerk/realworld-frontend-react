import { API_ROOT } from '../shared/constants/api';
import type { Profile } from '../shared/types/articles.types';
import { type ApiCallState } from './callApiWithAuth';
import { useApiGet } from './useApiGet';

interface ProfileState extends ApiCallState {
  profile: Profile | null;
}

export function useProfile(username: string | undefined): ProfileState {
  const { data, isLoading, error } = useApiGet<{ profile: Profile }>({
    url: !!username ? `${API_ROOT}profiles/${username}` : null,
  });

  return { profile: data?.profile ?? null, isLoading, error };
}
