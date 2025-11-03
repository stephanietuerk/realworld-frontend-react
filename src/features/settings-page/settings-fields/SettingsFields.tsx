import clsx from 'clsx';
import Field from '../../../components/field/Field';
import fieldStyles from '../../../shared/styles/FieldInputs.module.scss';
import type { FieldInputProps } from '../../../shared/types/input.types';
import styles from './SettingsFields.module.scss';

export function ProfileImageField({
  id = 'field-image',
  value = '',
  onChange,
  fieldClassName,
  formControlClassName,
}: FieldInputProps<HTMLInputElement>) {
  return (
    <Field
      id={id}
      label='Profile image'
      showStatus={false}
      className={clsx(styles.fieldLabel, fieldClassName)}
    >
      <span className={styles.contextLabel}>Must be a valid URL</span>
      <input
        id={id}
        name='image'
        type='text'
        value={value}
        required
        autoComplete='off'
        className={clsx(fieldStyles.input, formControlClassName)}
        placeholder={'New URL'}
        onChange={onChange}
      />
    </Field>
  );
}

export function UsernameField({
  id = 'field-username',
  value = '',
  onChange,
  fieldClassName,
  formControlClassName,
}: FieldInputProps<HTMLInputElement>) {
  return (
    <Field
      id={id}
      label='Username'
      showStatus={false}
      className={clsx(styles.fieldLabel, fieldClassName)}
    >
      <span className={styles.contextLabel}>
        How others will see you on the platform
      </span>
      <input
        id={id}
        name='username'
        type='text'
        value={value}
        required
        autoComplete='off'
        className={clsx(fieldStyles.input, formControlClassName)}
        placeholder='New username'
        onChange={onChange}
      />
    </Field>
  );
}

export function EmailField({
  id = 'field-email',
  value = '',
  onChange,
  fieldClassName,
  formControlClassName,
}: FieldInputProps<HTMLInputElement>) {
  return (
    <Field
      id={id}
      label='Email address'
      showStatus={false}
      className={clsx(styles.fieldLabel, fieldClassName)}
    >
      <span className={styles.contextLabel}>
        Used for logging in to your account
      </span>
      <input
        id={id}
        name='username'
        type='text'
        value={value}
        required
        autoComplete='off'
        className={clsx(fieldStyles.input, formControlClassName)}
        placeholder='New email address'
        onChange={onChange}
      />
    </Field>
  );
}

export function PasswordField({
  id = 'field-password',
  value = '',
  onChange,
  fieldClassName,
  formControlClassName,
}: FieldInputProps<HTMLInputElement>) {
  return (
    <Field
      id={id}
      label='Change password'
      showStatus={false}
      className={clsx(styles.fieldLabel, fieldClassName)}
    >
      <span className={styles.contextLabel}>
        Leave blank to keep current password
      </span>
      <input
        id={id}
        name='password'
        type='password'
        value={value}
        required
        autoComplete='off'
        className={clsx(fieldStyles.input, formControlClassName)}
        placeholder='New password'
        onChange={onChange}
      />
    </Field>
  );
}

export function BioField({
  id = 'field-bio',
  value = '',
  onChange,
  fieldClassName,
  formControlClassName,
}: FieldInputProps<HTMLTextAreaElement>) {
  return (
    <Field
      id={id}
      label='Bio'
      showStatus={false}
      className={clsx(styles.fieldLabel, fieldClassName)}
    >
      <span className={styles.contextLabel}>
        Displayed on your profile page
      </span>
      <textarea
        id={id}
        name='bio'
        value={value}
        required
        autoComplete='off'
        className={clsx(fieldStyles.textarea, formControlClassName)}
        placeholder='Tell people about yourself'
        onChange={onChange}
      />
    </Field>
  );
}
