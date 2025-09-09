import { API_ROOT } from '../shared/constants/api';
import type { Profile } from '../shared/types/articles.types';
import { type ApiCallState } from './callApiWithAuth';
import { useApiGet } from './useApiGet';

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
  const { data, isLoading, error } = useApiGet<{ comments: Comment[] }>({
    url: !!slug ? `${API_ROOT}articles/${slug}/comments` : null,
  });

  return { comments: data?.comments ?? null, isLoading, error };
}
