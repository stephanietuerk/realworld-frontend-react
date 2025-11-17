import clsx from 'clsx';
import { RotateCcw, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticle } from '../../api/useArticle';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import { useEditArticle } from '../../api/useEditArticle';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import Button from '../../components/button/Button';
import MainLayout from '../../components/main-layout/MainLayout';
import { ROUTE } from '../../shared/constants/routing';
import type { Article } from '../../shared/types/feed.types';
import ArticleSidebar from '../article-page/article-sidebar/ArticleSidebar';
import {
  BodyField,
  DescriptionField,
  TagsField,
  TitleField,
} from '../create-article-page/article-fields/ArticleFields';
import type { FormArticle } from '../create-article-page/CreateArticlePage';
import DeleteArticle from './delete-article/DeleteArticle';
import styles from './EditArticlePage.module.scss';

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
}) => { display: string; route: string }[] = ({ slug }) => [
  { display: 'Explore', route: ROUTE.explore },
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
  const [everEdited, setEverEdited] = useState(false);
  const editArticle = useEditArticle(slug!);

  const dirty = Boolean(
    article &&
      (edits.title.dirty ||
        edits.description.dirty ||
        edits.body.dirty ||
        edits.tagList.dirty),
  );

  useEffect(() => {
    if (dirty) setEverEdited(true);
  }, [dirty]);

  useEffect(() => {
    if (!article) return;
    setEdits(initArticleEdits(article));
  }, [article?.slug]);

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
    editArticle.mutate({
      title: edits.title.value,
      description: edits.description.value,
      body: edits.body.value,
      tagList: edits.tagList.value.split(',').map((t) => t.trim()),
    });
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
    <div className={styles.heightContainer}>
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
                    <X
                      size={16}
                      className={styles.closeIcon}
                      strokeWidth={3}
                    ></X>
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
                  {editArticle.error && (
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
                    disabled={!dirty || editArticle.isPending}
                    type='submit'
                    busy={editArticle.isPending}
                  >
                    <Save size={16} className={styles.saveIcon} />
                    Save changes
                  </Button>
                  {(everEdited || dirty) && (
                    <Button
                      variant='tertiary'
                      className={styles.revertButton}
                      disabled={!dirty || editArticle.isPending}
                      onClick={revertChanges}
                    >
                      <RotateCcw size={18} className={styles.revertIcon} />
                      Revert changes
                    </Button>
                  )}
                  <DeleteArticle
                    article={article}
                    disabled={dirty || editArticle.isPending}
                  />
                </>
              </ArticleSidebar>
            </BodyLayout>
          </MainLayout>
        </form>
      )}
    </div>
  );
}
