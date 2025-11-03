import clsx from 'clsx';
import { useArticle } from '../../../api/useArticle';
import { useAuthenticatedUser } from '../../../api/useAuthenticatedUser';
import { useProfile } from '../../../api/useProfile';
import AuthorDate from '../../../components/author-date/AuthorDate';
import FavoriteButton from '../../../components/favorite-button/FavoriteButton';
import FavoriteReadout from '../../../components/favorite-readout/FavoriteReadout';
import FollowButton from '../../../components/follow-button/FollowButton';
import SidebarLayout from '../../../components/sidebar-layout/SidebarLayout';
import { formatDate } from '../../../shared/utilities/date-utilities';
import styles from './ArticleSidebar.module.scss';

export default function ArticleSidebar({ children }: React.PropsWithChildren) {
  const { user: loggedInUser } = useAuthenticatedUser();
  const { article } = useArticle();
  const { profile: authorProfile, refetch: refetchProfile } = useProfile(
    article?.author?.username,
  );

  const isUsersArticle =
    loggedInUser && article?.author?.username === loggedInUser.username;

  return (
    <SidebarLayout className={styles.sidebar}>
      <div className={styles.card}>
        <div className={styles.articleActions}>
          {isUsersArticle ? (
            <>{children}</>
          ) : (
            <>
              {loggedInUser ? (
                <FavoriteButton
                  favorited={article.favorited}
                  count={article.favoritesCount}
                  slug={article.slug}
                  className={styles.favoriteButton}
                  displayIcon={true}
                  displayText={true}
                  selectedClassName={styles.selectedButton}
                  plusIconSize={18}
                  buttonVariant='secondary'
                ></FavoriteButton>
              ) : (
                <FavoriteReadout
                  count={article.favoritesCount}
                  className={styles.favoriteReadout}
                  expandedContext={true}
                ></FavoriteReadout>
              )}
            </>
          )}
        </div>
        <div className={styles.articleMetadata}>
          <div className={styles.articleTitleContainer}>
            <p className={styles.articleTitle}>{article.title}</p>
          </div>
          <p className={styles.label}>Written by</p>
          <AuthorDate author={article.author} showDate={false}></AuthorDate>
          {loggedInUser &&
            authorProfile &&
            article?.author?.username !== loggedInUser?.username && (
              <FollowButton
                profile={authorProfile}
                className={styles.followButton}
                selectedClassName={styles.selectedButton}
                syncWithApi={refetchProfile}
                iconSize={18}
                variant='secondary'
              ></FollowButton>
            )}
          <div>
            <p className={clsx(styles.label, styles.date)}>
              {article.updatedAt ? 'Last updated' : 'Published'}
            </p>
            <p>{formatDate(article.updatedAt || article.createdAt)}</p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
