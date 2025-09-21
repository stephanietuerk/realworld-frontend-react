import { useParams } from 'react-router';
import { useArticle } from '../../api/useArticle';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import MainLayout from '../../components/main-layout/MainLayout';
import { ROUTE } from '../../shared/constants/routing';
import { ErrorBoundary } from '../../shared/utilities/error-boundary';
import styles from './EditArticlePage.module.scss';
import type { FormArticle } from '../create-article-page/CreateArticlePage';
import { useState } from 'react';
import ArticleSidebar from '../article-page/article-sidebar/ArticleSidebar';
import type {
  Article,
  ValidArticleInput,
} from '../../shared/types/articles.types';
import { usePostArticle } from '../../api/usePostArticle';
import Button from '../../components/button/Button';
import SaveIcon from '../../components/icons/SaveIcon';
import CloseIcon from '../../components/icons/CloseIcon';
import {
  BodyField,
  DescriptionField,
  TagsField,
  TitleField,
} from '../create-article-page/fields/Fields';

interface ArticleEditItem {
  value: string;
  dirty: boolean;
}

interface ArticleEdits {
  title: ArticleEditItem;
  description: ArticleEditItem;
  body: ArticleEditItem;
  bodyHtml: string;
  tagList: ArticleEditItem;
}

const BREADCRUMBS: (slug: string) => { display: string; route: string }[] = (
  slug,
) => [
  { display: 'Home', route: ROUTE.home },
  {
    display: 'Edit Article',
    route: ROUTE.editor(slug),
  },
];

function initArticleEdits(article?: Article): ArticleEdits {
  return article
    ? {
        title: { value: article.title, dirty: false },
        description: { value: article.description, dirty: false },
        body: { value: article.bodyMarkdown, dirty: false },
        bodyHtml: article.body,
        tagList: { value: article.tagList?.join(', '), dirty: false },
      }
    : {
        title: { value: '', dirty: false },
        description: { value: '', dirty: false },
        body: { value: '', dirty: false },
        bodyHtml: '',
        tagList: { value: '', dirty: false },
      };
}

function isDirty(
  key: keyof FormArticle,
  content: string,
  article: Article,
): boolean {
  let touched: boolean;
  if (key === 'tagList') {
    touched = content !== article[key].join(', ');
  } else if (key === 'body') {
    touched = content !== article.bodyMarkdown;
  } else {
    touched = content !== article[key];
  }
  return touched;
}

export default function EditArticlePage() {
  const { slug } = useParams();
  const { article } = useArticle();
  const [edits, setEdits] = useState<ArticleEdits>(initArticleEdits(article));
  const [validArticle, setValidArticle] = useState<
    ValidArticleInput | undefined
  >(undefined);
  const { isLoading, error } = usePostArticle(validArticle, () => {});

  const canSave = Boolean(
    article &&
      (edits.title.dirty ||
        edits.description.dirty ||
        edits.body.dirty ||
        edits.tagList.dirty),
  );

  const updateEdits = (key: keyof FormArticle, content: string) => {
    setEdits((prev) => ({
      ...prev,
      [key]: {
        value: content,
        dirty: isDirty(key, content, article!),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidArticle({
      title: edits.title.value,
      description: edits.description.value,
      body: edits.body.value,
      tagList: edits.tagList.value.split(',').map((t) => t.trim()),
    });
  };

  if (!slug || !article.body) return null;

  return (
    <ErrorBoundary
      fallback={<p>Oops, error</p>}
      onError={(error, info) => console.log(error, info)}
    >
      {article && (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Banner
            outerContainerClassName={styles.bannerOuter}
            contentClassName={styles.bannerContent}
            breadcrumbs={BREADCRUMBS(slug)}
          >
            <fieldset className={styles.fieldset}>
              <div className={styles.titleRow}>
                <TitleField
                  id='field-title'
                  fieldClassName={styles.titleField}
                  formControlClassName={styles.inputTitle}
                  value={edits.title.value}
                  onChange={(e) => updateEdits('title', e.target.value)}
                ></TitleField>
              </div>
            </fieldset>
          </Banner>
          <MainLayout>
            <BodyLayout>
              {article && (
                <div className={styles.lowerEditContainer}>
                  <TagsField
                    id='field-tags'
                    value={edits.tagList.value}
                    onChange={(e) => updateEdits('tagList', e.target.value)}
                  ></TagsField>
                  <DescriptionField
                    id='field-description'
                    value={edits.description.value}
                    onChange={(e) => updateEdits('description', e.target.value)}
                  ></DescriptionField>
                  <div>
                    <BodyField
                      id='field-body'
                      value={edits.body.value}
                      formControlClassName={styles.textareaBody}
                      onChange={(e) => updateEdits('body', e.target.value)}
                    ></BodyField>
                  </div>
                </div>
              )}
              <ArticleSidebar>
                <>
                  {error && (
                    <p className={styles.error}>
                      Saving was not successful. Please try again.
                    </p>
                  )}
                  <Button
                    variant='primary'
                    className={styles.sidebarEditButton}
                    disabled={!canSave || isLoading}
                    type='submit'
                    busy={isLoading}
                  >
                    <SaveIcon size={20} className={styles.editIcon}></SaveIcon>
                    Save changes
                  </Button>
                  <Button
                    variant='tertiary'
                    className={styles.sidebarEditButton}
                  >
                    <CloseIcon
                      size={20}
                      svgClassName={styles.closeCircle}
                    ></CloseIcon>
                    Exit editing
                  </Button>
                </>
              </ArticleSidebar>
            </BodyLayout>
          </MainLayout>
        </form>
      )}
    </ErrorBoundary>
  );
}
