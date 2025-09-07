import { API_ROOT } from '../shared/constants/api';
import type { Article } from '../shared/types/articles.types';
import { useApiClient } from './useApiClient';

function getEndpoint(slug: string): string {
  return `${API_ROOT}articles/${slug}/favorite`;
}

export function useFavoriteActions() {
  const { useApiWithAuth } = useApiClient();

  const favoriteArticle = async (slug: string) => {
    return useApiWithAuth<{ article: Article }>(getEndpoint(slug), {
      method: 'POST',
    });
  };

  const unfavoriteArticle = async (slug: string) => {
    return useApiWithAuth<{ article: Article }>(getEndpoint(slug), {
      method: 'DELETE',
    });
  };

  return { favoriteArticle, unfavoriteArticle };
}
