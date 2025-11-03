import React, { useEffect, useMemo, type Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../api/useAuth';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import { useFeed } from '../../api/useFeed';
import type { FeedOption } from '../../shared/types/feed.types';
import ArticleCard from './article-card/ArticleCard';
import FeedSkeleton from './feed-skeleton/FeedSkeleton';
import styles from './Feed.module.scss';
import NoArticles from './no-articles/NoArticles';
import PaginationControls from './pagination-controls/PaginationControls';
import { useDelayedLoading } from './useDelayedLoading';

export default function Feed({
  options,
  setIsLoading,
}: {
  options: FeedOption[];
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isLoggedIn } = useAuth();
  const { user: loggedInUser } = useAuthenticatedUser();
  const { username: profileUsername } = useParams<{ username: string }>();
  const {
    isPending: isLoading,
    filteredItems: filteredArticles,
    feedSelections,
    setFeedSelections,
    page,
    pageSize,
    setPage,
    totalPages,
  } = useFeed();
  const showLoading = useDelayedLoading(isLoading, 500);

  useEffect(() => {
    setFeedSelections((prev) => ({ ...prev, feed: options[0].id }));
  }, [options]);

  useEffect(() => {
    setIsLoading(isLoading);
    return () => setIsLoading(false);
  }, [isLoading]);

  const option = useMemo(() => {
    const foundOption = options.find((o) => o.id === feedSelections.feed);
    if (!foundOption) {
      throw new Error('Could not find selected option in options prop');
    }
    return foundOption;
  }, [feedSelections, options]);

  const emptyState = useMemo(() => {
    const accessor = isLoggedIn ? 'loggedIn' : 'notLoggedIn';
    const emptyState = option.emptyState[accessor];
    if (!emptyState) {
      throw new Error('No empty state defined for this feed option');
    }
    return emptyState(isLoggedIn && loggedInUser?.username === profileUsername);
  }, [isLoggedIn, loggedInUser, profileUsername, option]);

  return (
    <div className={styles.feed}>
      {showLoading && <FeedSkeleton />}
      {!isLoading && filteredArticles.length === 0 && (
        <NoArticles
          title={emptyState.title}
          body={emptyState.body}
          action={emptyState.action}
        />
      )}
      {!isLoading && filteredArticles.length > 0 && (
        <>
          {filteredArticles.map((a) => (
            <ArticleCard
              article={a}
              key={a.slug}
              isLoggedInUsersProfile={
                profileUsername === loggedInUser?.username &&
                a.author.username === loggedInUser?.username
              }
            />
          ))}
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
