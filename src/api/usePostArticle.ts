import { API_ROOT } from '../shared/constants/api';
import type {
  Article,
  ValidArticleInput,
} from '../shared/types/articles.types';
import type { ApiCallState } from './callApiWithAuth';
import { useApiPost } from './useApiPost';

interface PostArticleState extends ApiCallState {
  article: Article | null;
}

export function usePostArticle(
  body: ValidArticleInput | undefined,
  onSuccess: () => void,
): PostArticleState {
  const { data, isLoading, error } = useApiPost<{ article: Article }>({
    url: !!body ? `${API_ROOT}articles` : null,
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
