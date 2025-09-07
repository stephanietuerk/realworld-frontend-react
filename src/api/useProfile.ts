import { API_ROOT } from '../shared/constants/api';
import type { Profile } from '../shared/types/articles.types';
import { useApiClient, type ApiCallState } from './useApiClient';

interface ProfileState extends ApiCallState {
  profile: Profile | null;
}

export function useProfile(username: string | undefined): ProfileState {
  const { useApiGet } = useApiClient();
  const { data, isLoading, error } = useApiGet<{ profile: Profile }>(
    `${API_ROOT}profiles/${username}`,
  );

  return { profile: data?.profile ?? null, isLoading, error };
}
