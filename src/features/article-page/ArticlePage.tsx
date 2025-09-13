import clsx from 'clsx';
import { useParams } from 'react-router';
import { useArticle } from '../../api/useArticle';
import { useProfile } from '../../api/useProfile';
import { useUser } from '../../api/useUser';
import AuthorDate from '../../components/author-date/AuthorDate';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
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
  const { article, refetchArticle: syncApi } = useArticle();
  const { user: loggedInUser } = useUser();
  const { profile: authorProfile } = useProfile(article?.author?.username);

  if (!slug || !article.body) return null;

  return (
    <ErrorBoundary
      fallback={<p>Oops, error</p>}
      onError={(error, info) => console.log(error, info)}
    >
      <Banner className={styles.bannerComponent}>
        <div className={styles.banner}>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs segments={BREADCRUMBS(slug)}></Breadcrumbs>
          </div>
          <div className={styles.titleRow}>
            <h1 className={styles.articleTitle}>{article.title}</h1>
          </div>
        </div>
        <Tags article={article}></Tags>
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
            {loggedInUser ? (
              <FavoriteButton
                favorited={article.favorited}
                count={article.favoritesCount}
                slug={article.slug}
                className={styles.favoriteButton}
                displayIcon={true}
                displayText={true}
                syncWithApi={syncApi}
              ></FavoriteButton>
            ) : (
              <FavoriteReadout
                count={article.favoritesCount}
                className={styles.favoriteReadout}
                expandedContext={true}
              ></FavoriteReadout>
            )}
            <div>
              <p className={styles.sidebarLabel}>Written by</p>
              <AuthorDate article={article} showDate={false}></AuthorDate>
              {loggedInUser &&
                authorProfile &&
                article?.author?.username !== loggedInUser?.username && (
                  <div>
                    <FollowButton
                      profile={authorProfile}
                      className={styles.followButton}
                      variant="tertiary"
                    ></FollowButton>
                  </div>
                )}
            </div>
            <div>
              <p className={clsx(styles.sidebarLabel, styles.date)}>
                {article.updatedAt ? 'Last updated' : 'Published'}
              </p>
              <p>{formatDate(article.updatedAt || article.createdAt)}</p>
            </div>
          </SidebarLayout>
        </BodyLayout>
      </MainLayout>
    </ErrorBoundary>
  );
}
