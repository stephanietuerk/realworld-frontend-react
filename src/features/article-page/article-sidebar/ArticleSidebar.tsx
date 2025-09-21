import clsx from 'clsx';
import AuthorDate from '../../../components/author-date/AuthorDate';
import FavoriteButton from '../../../components/favorite-button/FavoriteButton';
import FavoriteReadout from '../../../components/favorite-readout/FavoriteReadout';
import FollowButton from '../../../components/follow-button/FollowButton';
import SidebarLayout from '../../../components/sidebar-layout/SidebarLayout';
import { formatDate } from '../../../shared/utilities/date-utilities';
import styles from './ArticleSidebar.module.scss';
import { useUser } from '../../../api/useUser';
import { useArticle } from '../../../api/useArticle';
import { useProfile } from '../../../api/useProfile';

export default function ArticleSidebar({ children }: React.PropsWithChildren) {
  const { user: loggedInUser } = useUser();
  const { article, refetchArticle } = useArticle();
  const { profile: authorProfile, refetch: refetchProfile } = useProfile(
    article?.author?.username,
  );

  const isUsersArticle =
    loggedInUser && article?.author?.username === loggedInUser.username;

  return (
    <SidebarLayout className={styles.sidebar}>
      <div className={styles.card}>
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
                syncWithApi={refetchArticle}
                selectedClassName={styles.selectedButton}
              ></FavoriteButton>
            ) : (
              <FavoriteReadout
                count={article.favoritesCount}
                className={styles.favoriteReadout}
                expandedContext={true}
              ></FavoriteReadout>
            )}
            {loggedInUser &&
              authorProfile &&
              article?.author?.username !== loggedInUser?.username && (
                <FollowButton
                  profile={authorProfile}
                  className={styles.followButton}
                  selectedClassName={styles.selectedButton}
                  variant='secondary'
                  syncWithApi={refetchProfile}
                ></FollowButton>
              )}
          </>
        )}
        <div className={styles.articleMetadata}>
          <div className={styles.articleTitleContainer}>
            <p className={styles.articleTitle}>{article.title}</p>
          </div>
          <p className={styles.label}>Written by</p>
          <AuthorDate author={article.author} showDate={false}></AuthorDate>
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
