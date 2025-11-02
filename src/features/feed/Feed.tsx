import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../api/useAuth';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import { useFeed } from '../../api/useFeed';
import type { FeedOption } from '../../shared/types/feed.types';
import ArticleCard from './article-card/ArticleCard';
import styles from './Feed.module.scss';
import NoArticles from './no-articles/NoArticles';

export default function Feed({ options }: { options: FeedOption[] }) {
  const { isLoggedIn } = useAuth();
  const { user } = useAuthenticatedUser();
  const { username } = useParams();
  const {
    isPending: isLoading,
    filteredItems: filteredArticles,
    feedSelections,
    setFeedSelections,
  } = useFeed();

  useEffect(() => {
    setFeedSelections((prev) => ({ ...prev, feed: options[0].id }));
  }, [username]);

  const displayUserName =
    isLoggedIn && user && user.username === username ? 'you' : username;

  const option = useMemo(() => {
    const foundOption = options.find((o) => o.id === feedSelections.feed);
    if (!foundOption) {
      throw new Error('Could not find selected option in options prop');
    }
    return foundOption;
  }, [feedSelections, options]);

  const noArticlesText = useMemo(() => {
    return username
      ? option.emptyState.body({
          username: displayUserName,
          isLoggedInUser: isLoggedIn && user?.username === username,
        })
      : option.emptyState.body({});
  }, [user, username, option]);

  return (
    <div className={styles.feed}>
      {/* {isLoading && articles.length > 0 ? (
        <p>Loading...</p> // TODO make loading overlay
      ) : */}

      {!isLoading && filteredArticles.length === 0 ? (
        <NoArticles
          title='No articles found'
          body={noArticlesText}
          action={option.emptyState.action}
        />
      ) : (
        filteredArticles.map((a) => <ArticleCard article={a} key={a.slug} />)
      )}
    </div>
  );
}
