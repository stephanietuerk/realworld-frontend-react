import { API_ROOT } from '../shared/constants/api';
import type { Article } from '../shared/types/articles.types';
import { useApiWithAuth } from './callApiWithAuth';

function getEndpoint(slug: string): string {
  return `${API_ROOT}articles/${slug}/favorite`;
}

export function useFavoriteActions() {
  console.log('useFavorite');
  const callApiWithAuth = useApiWithAuth();

  const favoriteArticle = async (slug: string) => {
    return callApiWithAuth<{ article: Article }>(getEndpoint(slug), {
      method: 'POST',
    });
  };

  const unfavoriteArticle = async (slug: string) => {
    return callApiWithAuth<{ article: Article }>(getEndpoint(slug), {
      method: 'DELETE',
    });
  };

  return { favoriteArticle, unfavoriteArticle };
}
