import type { UseQueryResult } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import type { Profile } from '../shared/types/feed.types';
import { queryKeys } from './queryKeys';
import { useApiGet } from './useApiGet';

interface ProfileState
  extends Pick<
    UseQueryResult<Profile, AppError>,
    'isPending' | 'isError' | 'error' | 'refetch'
  > {
  profile?: Profile;
}

export function useProfile(username: string | undefined): ProfileState {
  const { data, isPending, isError, error, refetch } = useApiGet<
    {
      profile: Profile;
    },
    Profile
  >({
    queryKey: queryKeys.profile(username),
    url: username ? `${API_ROOT}/profiles/${username}` : undefined,
    queryOptions: {
      select: ({ profile }) => profile,
    },
  });

  return {
    profile: data,
    isPending,
    isError,
    error,
    refetch,
  };
}
