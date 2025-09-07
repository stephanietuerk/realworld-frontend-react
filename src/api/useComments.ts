import { API_ROOT } from '../shared/constants/api';
import type { Profile } from '../shared/types/articles.types';
import { useApiClient, type ApiCallState } from './useApiClient';

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;
}

interface CommentsState extends ApiCallState {
  comments: Comment[] | null;
}

export function useComments(slug: string): CommentsState {
  const { useApiGet } = useApiClient();
  const { data, isLoading, error } = useApiGet<{ comments: Comment[] }>(
    `${API_ROOT}articles/${slug}/comments`,
  );

  return { comments: data?.comments ?? null, isLoading, error };
}
