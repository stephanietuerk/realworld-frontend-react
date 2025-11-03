import type { UseQueryResult } from '@tanstack/react-query';
import { API_ROOT } from '../shared/constants/api';
import type { AppError } from '../shared/types/errors.types';
import { useApiGet } from './useApiGet';

type TagsResponse = { tags: string[] };

interface TagsState
  extends Pick<
    UseQueryResult<string[], AppError>,
    'isPending' | 'isError' | 'error' | 'refetch'
  > {
  tags?: string[];
}

function buildTagsUrl({
  username,
  limit,
}: {
  username?: string;
  limit?: number;
}) {
  let url = `${API_ROOT}/tags`;
  const params = new URLSearchParams();
  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }
  if (username && username.length > 0) {
    params.append('username', username);
  }
  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  return url;
}

export function useTags({
  username,
  limit,
}: {
  username?: string;
  limit?: number;
} = {}): TagsState {
  const url = buildTagsUrl({ username, limit });
  const { data, isPending, isError, error, refetch } = useApiGet<
    TagsResponse,
    string[]
  >({
    queryKey: ['tags'],
    url: url,
    queryOptions: {
      select: ({ tags }) => {
        return tags;
      },
    },
  });

  return {
    tags: data,
    isPending,
    isError,
    error,
    refetch,
  };
}
