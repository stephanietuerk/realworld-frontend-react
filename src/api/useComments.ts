import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { API_ROOT } from '../shared/constants/api';
import type { ApiError } from '../shared/types/errors.types';
import type { Profile } from '../shared/types/feed.types';
import { dateifyResponse } from './dateify';
import { queryKeys } from './queryKeys';
import { useApiGet } from './useApiGet';

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;
}

interface RawComment extends Omit<Comment, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

interface CommentsState
  extends Pick<
    UseQueryResult<Comment[], ApiError>,
    'isPending' | 'isError' | 'error' | 'refetch'
  > {
  comments?: Comment[];
}

function transformAndSortComments(
  comments: RawComment[] | undefined,
): Comment[] {
  if (!comments) {
    return [];
  }
  return comments
    .map((c) => dateifyResponse<RawComment, Comment>(c))
    .slice()
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export function useComments(slug: string): CommentsState {
  const { data, isPending, isError, error, refetch } = useApiGet<
    { comments: RawComment[] },
    Comment[]
  >({
    queryKey: queryKeys.comments(slug),
    url: !!slug ? `${API_ROOT}/articles/${slug}/comments` : undefined,
    queryOptions: {
      select: ({ comments }) => transformAndSortComments(comments),
    },
  });

  return useMemo(
    () => ({
      comments: data,
      isPending,
      isError,
      error,
      refetch,
    }),
    [data, isPending, isError, error, refetch],
  );
}
