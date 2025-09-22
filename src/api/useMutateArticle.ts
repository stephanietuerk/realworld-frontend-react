import { API_ROOT } from '../shared/constants/api';
import type {
  Article,
  ValidArticleMutation,
} from '../shared/types/articles.types';
import type { ApiCallState } from './callApiWithAuth';
import { useApiMutation } from './useApiMutation';

interface PostArticleState extends ApiCallState {
  article: Article | null;
}

interface MutateArticleParams {
  body: ValidArticleMutation | undefined;
  onSuccess: () => void;
  method: 'POST' | 'PUT';
}

export function useMutateArticle({
  body,
  onSuccess,
  method,
}: MutateArticleParams): PostArticleState {
  const { data, isLoading, error } = useApiMutation<{ article: Article }>({
    url: !!body ? `${API_ROOT}articles` : null,
    method,
    options: {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        article: body,
      }),
    },
    onSuccess,
  });

  return { article: data?.article ?? null, isLoading, error };
}
