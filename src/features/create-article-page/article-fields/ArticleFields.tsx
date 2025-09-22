import styles from './ArticleFields.module.scss';
import { clsx } from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import { mdToHtml } from '../../../shared/utilities/markdown-to-html';
import { Tabs } from 'radix-ui';
import Field from '../../../components/field/Field';

export function TitleField({
  id = 'field-title',
  value,
  onChange,
  fieldClassName,
  formControlClassName,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldClassName?: string;
  formControlClassName?: string;
}) {
  return (
    <Field
      id={id}
      label='Article title'
      showStatus={false}
      className={fieldClassName}
    >
      <input
        id={id}
        name='title'
        type='text'
        value={value}
        required
        autoComplete='off'
        className={clsx(styles.input, styles.inputTitle, formControlClassName)}
        placeholder='Article Title'
        onChange={onChange}
      />
    </Field>
  );
}

export function DescriptionField({
  id = 'field-description',
  value,
  onChange,
  fieldClassName,
  formControlClassName,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldClassName?: string;
  formControlClassName?: string;
}) {
  return (
    <Field
      id={id}
      label='Short description'
      showStatus={false}
      className={fieldClassName}
    >
      <input
        id={id}
        name='description'
        type='text'
        value={value}
        required
        autoComplete='off'
        className={clsx(
          styles.input,
          styles.inputDescription,
          formControlClassName,
        )}
        placeholder='What is this article about?'
        onChange={onChange}
      />
    </Field>
  );
}

export function TagsField({
  id = 'field-tags',
  value,
  onChange,
  fieldClassName,
  formControlClassName,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldClassName?: string;
  formControlClassName?: string;
}) {
  return (
    <Field
      id={id}
      label='Tags'
      required={false}
      showStatus={true}
      className={fieldClassName}
    >
      <input
        id={id}
        name='tagList'
        type='text'
        value={value}
        autoComplete='off'
        className={clsx(styles.input, styles.inputTags, formControlClassName)}
        placeholder='Enter tags (comma separated)'
        onChange={onChange}
      />
    </Field>
  );
}

const TEXTAREA_MIN_HEIGHT = 160;
const TEXTAREA_MAX_HEIGHT = 600;

function updateTextareaHeight(
  el: HTMLTextAreaElement,
  max = TEXTAREA_MAX_HEIGHT,
  min = TEXTAREA_MIN_HEIGHT,
): void {
  el.style.height = '0px';
  const content = el.scrollHeight;
  const clamped = Math.max(min, Math.min(content, max));
  el.style.height = clamped + 'px';
  el.style.overflowY = content > max ? 'auto' : 'hidden';
}

export function BodyField({
  id = 'field-body',
  value,
  onChange,
  fieldClassName,
  formControlClassName,
  previewClassName,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fieldClassName?: string;
  formControlClassName?: string;
  previewClassName?: string;
}) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [body, setBody] = useState<string>(value);

  useLayoutEffect(() => {
    if (textareaRef.current) updateTextareaHeight(textareaRef.current);
  }, []);

  const handleBodyTabChange = (tab: string) => {
    if (tab === 'preview') {
      mdToHtml(body).then((html) => {
        setPreview(html);
      });
    }
    if (tab === 'write') {
      requestAnimationFrame(() => updateTextareaHeight(textareaRef.current!));
    }
    setActiveTab(tab as 'write' | 'preview');
  };

  const onBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    onChange(e);
    requestAnimationFrame(() => updateTextareaHeight(textareaRef.current!));
  };

  return (
    <Field
      id={id}
      label='Article content (Markdown or plain text)'
      showStatus={false}
      className={fieldClassName}
    >
      <Tabs.Root defaultValue='write' onValueChange={handleBodyTabChange}>
        <Tabs.List>
          <Tabs.Trigger
            className={clsx(
              styles.tabsTrigger,
              activeTab === 'write' && styles.activeTab,
            )}
            value='write'
          >
            Write
          </Tabs.Trigger>
          <Tabs.Trigger
            className={clsx(
              styles.tabsTrigger,
              activeTab === 'preview' && styles.activeTab,
            )}
            value='preview'
          >
            Preview
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='write'>
          <textarea
            ref={textareaRef}
            id='field-body'
            name='body'
            value={value}
            autoComplete='off'
            required
            className={clsx(
              styles.textarea,
              styles.inputBody,
              formControlClassName,
            )}
            placeholder='Write your article'
            onChange={onBodyChange}
          />
        </Tabs.Content>
        <Tabs.Content value='preview'>
          <div
            className={clsx(styles.inputBody, styles.preview, previewClassName)}
            dangerouslySetInnerHTML={{ __html: preview }}
          ></div>
        </Tabs.Content>
      </Tabs.Root>
    </Field>
  );
}
