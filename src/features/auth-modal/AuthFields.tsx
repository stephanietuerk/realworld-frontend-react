import styles from './AuthFields.module.scss';

export function EmailField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className={styles.formField}>
      <div className={styles.labelContainer}>
        <label className={styles.formLabel} htmlFor='email'>
          Email
        </label>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <input
        className={styles.input}
        id='email'
        name='email'
        type='email'
        required
        autoComplete='email'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function PasswordField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className={styles.formField}>
      <div className={styles.labelContainer}>
        <label className={styles.formLabel} htmlFor='password'>
          Password
        </label>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <input
        className={styles.input}
        id='password'
        type='password'
        name='password'
        required
        autoComplete='current-password'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function UsernameField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className={styles.formField}>
      <div className={styles.labelContainer}>
        <label className={styles.formLabel} htmlFor='username'>
          Username
        </label>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <input
        className={styles.input}
        id='username'
        type='text'
        name='username'
        autoComplete='username'
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
