import { API_ROOT } from '../shared/constants/api';
import type { Profile } from '../shared/types/articles.types';
import { dateifyResponse } from './dateify';
import { useApiGet, type ApiGetState } from './useApiGet';

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

interface ApiCommentsState extends Omit<ApiGetState<Comment[]>, 'data'> {
  comments: Comment[] | null;
}

function transformAndSortComments(
  comments: RawComment[] | undefined,
): Comment[] | null {
  if (!comments) {
    return null;
  }
  return comments
    .map((c) => dateifyResponse<RawComment, Comment>(c))
    .slice()
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export function useComments(slug: string): ApiCommentsState {
  console.log('use comments!', slug);
  const { data, isLoading, error, refetch } = useApiGet<{
    comments: RawComment[];
  }>({
    url: !!slug ? `${API_ROOT}articles/${slug}/comments` : null,
  });

  return {
    comments: transformAndSortComments(data?.comments),
    isLoading,
    error,
    refetch,
  };
}
