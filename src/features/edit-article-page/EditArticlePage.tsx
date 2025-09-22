import { useNavigate, useParams } from 'react-router-dom';
import { useArticle } from '../../api/useArticle';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import MainLayout from '../../components/main-layout/MainLayout';
import { ROUTE } from '../../shared/constants/routing';
import { ErrorBoundary } from '../../shared/utilities/error-boundary';
import styles from './EditArticlePage.module.scss';
import type { FormArticle } from '../create-article-page/CreateArticlePage';
import { useEffect, useState } from 'react';
import ArticleSidebar from '../article-page/article-sidebar/ArticleSidebar';
import type {
  Article,
  ValidArticleMutation,
} from '../../shared/types/articles.types';
import { useMutateArticle } from '../../api/useMutateArticle';
import Button from '../../components/button/Button';
import SaveIcon from '../../components/icons/SaveIcon';
import CloseIcon from '../../components/icons/CloseIcon';
import {
  BodyField,
  DescriptionField,
  TagsField,
  TitleField,
} from '../create-article-page/article-fields/ArticleFields';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import RevertIcon from '../../components/icons/RevertIcon';
import clsx from 'clsx';

interface ArticleEditItem {
  value: string;
  dirty: boolean;
}

interface ArticleEdits {
  title: ArticleEditItem;
  description: ArticleEditItem;
  body: ArticleEditItem;
  tagList: ArticleEditItem;
}

const BREADCRUMBS: ({
  slug,
  username,
}: {
  slug: string;
  username: string;
}) => { display: string; route: string }[] = ({ slug, username }) => [
  { display: 'Explore', route: ROUTE.explore },
  {
    display: 'My Content',
    route: ROUTE.profile(username),
  },
  {
    display: 'Edit Article',
    route: ROUTE.articleEdit(slug),
  },
];

function initArticleEdits(article?: Article): ArticleEdits {
  return article
    ? {
        title: { value: article.title, dirty: false },
        description: { value: article.description, dirty: false },
        body: { value: article.bodyMarkdown, dirty: false },
        tagList: { value: article.tagList?.join(', '), dirty: false },
      }
    : {
        title: { value: '', dirty: false },
        description: { value: '', dirty: false },
        body: { value: '', dirty: false },
        tagList: { value: '', dirty: false },
      };
}

function isDirty(
  key: keyof FormArticle,
  content: string,
  article: Article,
): boolean {
  let dirty: boolean;
  if (key === 'tagList') {
    dirty = content !== article[key].join(', ');
  } else if (key === 'body') {
    dirty = content !== article.bodyMarkdown;
  } else {
    dirty = content !== article[key];
  }
  return dirty;
}

export default function EditArticlePage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useAuthenticatedUser();
  const { article } = useArticle();
  const [edits, setEdits] = useState<ArticleEdits>(() =>
    initArticleEdits(article),
  );
  const [validArticle, setValidArticle] = useState<
    ValidArticleMutation | undefined
  >(undefined);
  const [everEdited, setEverEdited] = useState(false);
  const {
    article: postedArticle,
    isLoading,
    error,
  } = useMutateArticle({
    body: validArticle,
    onSuccess: () => {},
    method: 'PUT',
  });

  const dirty = Boolean(
    article &&
      (edits.title.dirty ||
        edits.description.dirty ||
        edits.body.dirty ||
        edits.tagList.dirty),
  );

  useEffect(() => {
    if (dirty) setEverEdited(true);
    console.log('everEdited', dirty);
  }, [dirty]);

  useEffect(() => {
    if (!article) return;
    setEdits(initArticleEdits(article));
  }, [article?.slug]);

  useEffect(() => {
    if (!postedArticle) return;
    navigate(ROUTE.article(postedArticle.slug));
  }, [postedArticle, navigate]);

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
    console.log(edits);
    setValidArticle({
      title: edits.title.value,
      description: edits.description.value,
      body: edits.body.value,
      tagList: edits.tagList.value.split(',').map((t) => t.trim()),
    });
    console.log(validArticle);
  };

  const navigateToArticle = () => {
    if (article) {
      navigate(ROUTE.article(article.slug));
    }
  };

  const revertChanges = () => {
    setEdits(initArticleEdits(article));
  };

  if (!slug || !article.body) return null;

  return (
    <ErrorBoundary
      fallback={<p>Oops, error</p>}
      onError={(error, info) => console.log(error, info)}
    >
      {article && user && (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Banner
            outerContainerClassName={styles.bannerOuter}
            contentClassName={styles.bannerContent}
            breadcrumbs={BREADCRUMBS({ slug, username: user?.username })}
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
                <div className={styles.exitButtonContainer}>
                  <Button
                    variant='tertiary'
                    onClick={navigateToArticle}
                    className={styles.exitButton}
                  >
                    <CloseIcon
                      size={16}
                      svgClassName={styles.closeCircle}
                    ></CloseIcon>
                    Exit editing
                  </Button>
                </div>
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
                    className={clsx(
                      styles.saveButton,
                      (everEdited || dirty) && styles.canRevert,
                    )}
                    disabled={!dirty || isLoading}
                    type='submit'
                    busy={isLoading}
                  >
                    <SaveIcon size={20} className={styles.saveIcon}></SaveIcon>
                    Save changes
                  </Button>
                  {(everEdited || dirty) && (
                    <Button
                      variant='tertiary'
                      className={styles.revertButton}
                      disabled={!dirty || isLoading}
                      onClick={revertChanges}
                    >
                      <RevertIcon
                        size={20}
                        className={styles.revertIcon}
                      ></RevertIcon>
                      Revert changes
                    </Button>
                  )}
                </>
              </ArticleSidebar>
            </BodyLayout>
          </MainLayout>
        </form>
      )}
    </ErrorBoundary>
  );
}
