import Button from '../../components/button/Button';
import MainLayout from '../../components/main-layout/MainLayout';
import styles from './CreateArticlePage.module.scss';
import { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import { ROUTE } from '../../shared/constants/routing';
import { usePostArticle } from '../../api/usePostArticle';
import { useNavigate } from 'react-router-dom';
import type {
  BaseArticleInput,
  ValidArticleInput,
} from '../../shared/types/articles.types';
import { ErrorBoundary } from '../../shared/utilities/error-boundary';
import {
  BodyField,
  DescriptionField,
  TagsField,
  TitleField,
} from './fields/Fields';

export interface FormArticle extends BaseArticleInput {
  tagList: string;
}

const BREADCRUMBS: { display: string; route: string }[] = [
  { display: 'Home', route: ROUTE.home },
  {
    display: 'Create Article',
    route: ROUTE.editor(),
  },
];

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const [rawInput, setRawInput] = useState<FormArticle>({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });
  const [validArticle, setValidArticle] = useState<
    ValidArticleInput | undefined
  >(undefined);
  const { article, isLoading, error } = usePostArticle(validArticle, () => {});

  useEffect(() => {
    if (!article) return;
    navigate(ROUTE.article(article.slug));
  }, [article, navigate]);

  const updateArticle = (key: keyof FormArticle, content: string) => {
    setRawInput((prev) => ({ ...prev, [key]: content }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidArticle({
      ...rawInput,
      tagList: rawInput.tagList.split(',').map((t) => t.trim()),
    });
  };

  const canSubmit = [rawInput.title, rawInput.description, rawInput.body].every(
    (s) => s.trim().length > 0,
  );

  return (
    <ErrorBoundary
      fallback={<p>Oops, error</p>}
      onError={(error, info) => console.log(error, info)}
    >
      <Banner
        outerContainerClassName={styles.bannerOuter}
        contentClassName={styles.bannerContent}
        breadcrumbs={BREADCRUMBS}
      >
        <div className={styles.titleRow}>
          <h1 className={styles.bannerTitle}>Create an article</h1>
        </div>
      </Banner>
      <MainLayout>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <p className={styles.instructions}>All fields required except Tags</p>
          <fieldset className={styles.fieldset}>
            <TitleField
              id='field-title'
              value={rawInput.title}
              onChange={(e) => updateArticle('title', e.target.value)}
            ></TitleField>
            <DescriptionField
              id='field-description'
              value={rawInput.description}
              onChange={(e) => updateArticle('description', e.target.value)}
            ></DescriptionField>
            <BodyField
              id='field-body'
              value={rawInput.body}
              formControlClassName={styles.textareaBody}
              onChange={(e) => updateArticle('body', e.target.value)}
            ></BodyField>
            <TagsField
              id='field-tags'
              value={rawInput.tagList}
              onChange={(e) => updateArticle('tagList', e.target.value)}
            ></TagsField>
          </fieldset>
          <>
            {error && (
              <p className={styles.error}>
                Publishing was not successful. Please try again.
              </p>
            )}
            <Button
              className={styles.button}
              variant='primary'
              type='submit'
              disabled={!canSubmit || isLoading}
              busy={isLoading}
            >
              Publish article
            </Button>
          </>
        </form>
      </MainLayout>
    </ErrorBoundary>
  );
}
