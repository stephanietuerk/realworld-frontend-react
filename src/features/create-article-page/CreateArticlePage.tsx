import clsx from 'clsx';
import Button from '../../components/button/Button';
import MainLayout from '../../components/main-layout/MainLayout';
import styles from './CreateArticlePage.module.scss';
import { useEffect, useRef, useState } from 'react';
import Banner from '../../components/banner/Banner';
import { ROUTE } from '../../shared/constants/routing';
import Field from './field/Field';
import { usePostArticle } from '../../api/usePostArticle';
import { useNavigate } from 'react-router-dom';
import type {
  BaseArticleInput,
  ValidArticleInput,
} from '../../shared/types/articles.types';
import { ErrorBoundary } from '../../shared/utilities/error-boundary';

interface FormArticle extends BaseArticleInput {
  tagList: string;
}

const BREADCRUMBS: { display: string; route: string }[] = [
  { display: 'Home', route: ROUTE.home },
  {
    display: 'Create Article',
    route: ROUTE.editor(),
  },
];

const TEXTAREA_HEIGHT = 160;
const TEXTAREA_PADDING = 24;
const TEXTAREA_MAX_HEIGHT = 700;

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!article) return;
    navigate(ROUTE.article(article.slug));
  }, [article, navigate]);

  const updateArticle = (key: keyof FormArticle, content: string) => {
    setRawInput((prev) => ({ ...prev, [key]: content }));
    if (key === 'body' && textareaRef.current) {
      const contentHeight = textareaRef.current.scrollHeight;
      const containerHeight = textareaRef.current.style.height
        ? parseFloat(textareaRef.current.style.height.slice(0, -2))
        : TEXTAREA_HEIGHT;
      if (contentHeight <= TEXTAREA_HEIGHT) {
        if (containerHeight > TEXTAREA_HEIGHT) {
          textareaRef.current.style.height = `${TEXTAREA_HEIGHT}px`;
        }
        return;
      }
      if (contentHeight > containerHeight) {
        const proposedHeight = contentHeight + TEXTAREA_PADDING;
        textareaRef.current.style.height =
          proposedHeight < TEXTAREA_MAX_HEIGHT
            ? `${contentHeight + TEXTAREA_PADDING}px`
            : `${TEXTAREA_MAX_HEIGHT}px`;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidArticle({
      ...rawInput,
      tagList: rawInput.tagList.split(',').map((t) => t.trim()),
    });
  };

  const canSubmit =
    rawInput.title.trim() &&
    rawInput.description.trim() &&
    rawInput.body.trim();

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
            <Field id='field-title' label='Article title' showStatus={false}>
              <input
                id='field-title'
                name='title'
                type='text'
                value={rawInput.title}
                required
                className={clsx(styles.input, styles.inputTitle)}
                placeholder='Article Title'
                onChange={(e) => updateArticle('title', e.target.value)}
              />
            </Field>
            <Field
              id='field-description'
              label='Short description'
              showStatus={false}
            >
              <input
                id='field-description'
                name='description'
                type='text'
                value={rawInput.description}
                required
                autoComplete='on'
                className={clsx(styles.input, styles.inputAbout)}
                placeholder='What is this article about?'
                onChange={(e) => updateArticle('description', e.target.value)}
              />
            </Field>
            <Field
              id='field-body'
              label='Article content (Markdown or plain text)'
              showStatus={false}
            >
              <textarea
                ref={textareaRef}
                id='field-body'
                name='body'
                value={rawInput.body}
                autoComplete='off'
                required
                className={clsx(styles.textarea, styles.articleBody)}
                placeholder='Write your article'
                onChange={(e) => updateArticle('body', e.target.value)}
              />
            </Field>
            <Field
              id='field-tags'
              label='Tags'
              required={false}
              showStatus={true}
            >
              <input
                id='field-tags'
                name='tags'
                type='text'
                value={rawInput.tagList}
                className={clsx(styles.input, styles.inputTags)}
                placeholder='Enter tags (comma separated)'
                onChange={(e) => updateArticle('body', e.target.value)}
              />
            </Field>
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
              disabled={!canSubmit || !isLoading}
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
