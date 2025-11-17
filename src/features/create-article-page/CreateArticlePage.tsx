import { useState } from 'react';
import { useCreateArticle } from '../../api/useCreateArticle';
import Banner from '../../components/banner/Banner';
import Button from '../../components/button/Button';
import MainLayout from '../../components/main-layout/MainLayout';
import type { BaseArticleMutation } from '../../shared/types/feed.types';
import {
  BodyField,
  DescriptionField,
  TagsField,
  TitleField,
} from './article-fields/ArticleFields';
import styles from './CreateArticlePage.module.scss';

export interface FormArticle extends BaseArticleMutation {
  tagList: string;
}

export default function CreateArticlePage() {
  const [rawInput, setRawInput] = useState<FormArticle>({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });
  const createArticle = useCreateArticle();

  const updateArticle = (key: keyof FormArticle, content: string) => {
    setRawInput((prev) => ({ ...prev, [key]: content }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArticle.mutate({
      ...rawInput,
      tagList: rawInput.tagList.split(',').map((t) => t.trim()),
    });
  };

  const canSubmit = [rawInput.title, rawInput.description, rawInput.body].every(
    (s) => s.trim().length > 0,
  );

  return (
    <div className={styles.heightContainer}>
      <Banner
        outerContainerClassName={styles.bannerOuter}
        contentClassName={styles.bannerContent}
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
            {createArticle.error && (
              <p className={styles.error}>
                Publishing was not successful. Please try again.
              </p>
            )}
            <Button
              className={styles.button}
              variant='primary'
              type='submit'
              disabled={!canSubmit || createArticle.isPending}
              busy={createArticle.isPending}
            >
              Publish article
            </Button>
          </>
        </form>
      </MainLayout>
    </div>
  );
}
