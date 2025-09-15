import clsx from 'clsx';
import { useParams } from 'react-router';
import { useArticle } from '../../api/useArticle';
import { useProfile } from '../../api/useProfile';
import { useUser } from '../../api/useUser';
import AuthorDate from '../../components/author-date/AuthorDate';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import FavoriteButton from '../../components/favorite-button/FavoriteButton';
import FavoriteReadout from '../../components/favorite-readout/FavoriteReadout';
import FollowButton from '../../components/follow-button/FollowButton';
import MainLayout from '../../components/main-layout/MainLayout';
import SidebarLayout from '../../components/sidebar-layout/SidebarLayout';
import Tags from '../../components/tags/Tags';
import { ROUTE } from '../../shared/constants/routing';
import { formatDate } from '../../shared/utilities/date-utilities';
import { ErrorBoundary } from '../../shared/utilities/error-boundary';
import styles from './ArticlePage.module.scss';
import Comments from './comments/Comments';

const BREADCRUMBS: (slug: string) => { display: string; route: string }[] = (
  slug,
) => [
  { display: 'Home', route: ROUTE.home },
  {
    display: 'Read Article',
    route: ROUTE.article(slug),
  },
];

export default function ArticlePage() {
  const { slug } = useParams();
  const { article, refetchArticle } = useArticle();
  const { user: loggedInUser } = useUser();
  const { profile: authorProfile, refetch: refetchProfile } = useProfile(
    article?.author?.username,
  );

  if (!slug || !article.body) return null;

  return (
    <ErrorBoundary
      fallback={<p>Oops, error</p>}
      onError={(error, info) => console.log(error, info)}
    >
      <Banner
        outerContainerClassName={styles.bannerOuter}
        contentClassName={styles.bannerContent}
        breadcrumbs={BREADCRUMBS(slug)}
      >
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.articleTitle}>{article.title}</h1>
          </div>
          <Tags article={article}></Tags>
        </div>
      </Banner>
      <MainLayout>
        <BodyLayout>
          {article && (
            <div>
              <div
                className={styles.articleBody}
                dangerouslySetInnerHTML={{ __html: article.body }}
              ></div>
              <Comments slug={article.slug}></Comments>
            </div>
          )}
          <SidebarLayout className={styles.sidebar}>
            <div className={styles.sidebarCard}>
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
              <div className={styles.sidebarStatic}>
                <p className={styles.sidebarArticleTitle}>{article.title}</p>
                <p className={styles.sidebarLabel}>Written by</p>
                <AuthorDate
                  author={article.author}
                  showDate={false}
                ></AuthorDate>
                <div>
                  <p className={clsx(styles.sidebarLabel, styles.date)}>
                    {article.updatedAt ? 'Last updated' : 'Published'}
                  </p>
                  <p>{formatDate(article.updatedAt || article.createdAt)}</p>
                </div>
              </div>
            </div>
          </SidebarLayout>
        </BodyLayout>
      </MainLayout>
    </ErrorBoundary>
  );
}
