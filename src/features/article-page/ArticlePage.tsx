import { useNavigate, useParams } from 'react-router-dom';
import { useArticle } from '../../api/useArticle';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import MainLayout from '../../components/main-layout/MainLayout';
import Tags from '../../components/tags/Tags';
import { ROUTE } from '../../shared/constants/routing';
import { ErrorBoundary } from '../../shared/utilities/error-boundary';
import styles from './ArticlePage.module.scss';
import Comments from './comments/Comments';
import ArticleSidebar from './article-sidebar/ArticleSidebar';
import Button from '../../components/button/Button';
import EditIcon from '../../components/icons/EditIcon';

const BREADCRUMBS: (slug: string) => { display: string; route: string }[] = (
  slug,
) => [
  { display: 'Explore', route: ROUTE.explore },
  {
    display: 'Read Article',
    route: ROUTE.article(slug),
  },
];

export default function ArticlePage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { article } = useArticle();

  const navigateToEditor = () => {
    if (slug) {
      navigate(ROUTE.articleEdit(slug));
    }
  };

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
          <ArticleSidebar>
            <Button
              variant='secondary'
              className={styles.editButton}
              onClick={navigateToEditor}
            >
              <EditIcon size={20} className={styles.editIcon}></EditIcon>
              Edit article
            </Button>
          </ArticleSidebar>
        </BodyLayout>
      </MainLayout>
    </ErrorBoundary>
  );
}
