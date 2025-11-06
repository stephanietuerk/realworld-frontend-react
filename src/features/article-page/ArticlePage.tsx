import { Pencil } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticle } from '../../api/useArticle';
import Banner from '../../components/banner/Banner';
import Button from '../../components/button/Button';
import {
  ArticleContentLayout,
  ArticleTextLayout,
  ContentMaxWidthLayout,
  ContentSidePaddingLayout,
  SidebarLayout,
} from '../../components/layout/Layout';
import Tags from '../../components/tags/Tags';
import { ROUTE } from '../../shared/constants/routing';
import ArticleSidebar from './article-sidebar/ArticleSidebar';
import styles from './ArticlePage.module.scss';
import Comments from './comments/Comments';

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
    <>
      <Banner
        outerContainerClassName={styles.bannerOuter}
        contentClassName={styles.bannerContent}
        breadcrumbs={BREADCRUMBS(slug)}
      >
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.articleTitle}>{article.title}</h1>
          </div>
          <Tags article={article} />
        </div>
      </Banner>
      <ContentSidePaddingLayout>
        <ContentMaxWidthLayout>
          <ArticleContentLayout>
            {article && (
              <ArticleTextLayout className={styles.articleContent}>
                <div
                  className={styles.articleBody}
                  dangerouslySetInnerHTML={{ __html: article.body }}
                ></div>
                <Comments slug={article.slug} />
              </ArticleTextLayout>
            )}
          </ArticleContentLayout>
          <SidebarLayout>
            <ArticleSidebar>
              <Button
                variant='secondary'
                className={styles.editButton}
                onClick={navigateToEditor}
              >
                <Pencil size={16} className={styles.editIcon} />
                Edit article
              </Button>
            </ArticleSidebar>
          </SidebarLayout>
        </ContentMaxWidthLayout>
      </ContentSidePaddingLayout>
    </>
  );
}
