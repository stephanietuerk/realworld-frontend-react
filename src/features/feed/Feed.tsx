import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useArticles } from '../../api/useArticles';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import type { FeedOption } from '../../shared/types/articles.types';
import ArticleCard from './article-card/ArticleCard';
import styles from './Feed.module.scss';
import { useAuth } from '../../api/useAuth';

export default function Feed({ options }: { options: FeedOption[] }) {
  const { isLoggedIn } = useAuth();
  const { user } = useAuthenticatedUser();
  const { username } = useParams();
  const { isLoading, filteredArticles, feedSelections, setFeedSelections } =
    useArticles();

  useEffect(() => {
    setFeedSelections((prev) => ({ ...prev, feed: options[0].id }));
  }, [username]);

  const displayUserName =
    isLoggedIn && user && user.username === username ? 'you' : username;

  const noArticlesText = useMemo(() => {
    const option = options.find((o) => o.id === feedSelections.feed);
    if (!option) {
      throw new Error('Could not find selected option in options prop');
    }

    return username
      ? option.noArticlesString(displayUserName)
      : option.noArticlesString();
  }, [user, username, feedSelections]);

  return (
    <div className={styles.feed}>
      {/* {isLoading && articles.length > 0 ? (
        <p>Loading...</p> // TODO make loading overlay
      ) : */}

      {!isLoading && filteredArticles.length === 0 ? (
        <p className={styles.noArticles}>{noArticlesText}</p>
      ) : (
        filteredArticles.map((a) => <ArticleCard article={a} key={a.slug} />)
      )}
    </div>
  );
}
