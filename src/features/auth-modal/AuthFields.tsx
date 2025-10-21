import styles from './AuthFields.module.scss';

export function EmailField() {
  return (
    <div className={styles.formField}>
      <label className={styles.formLabel} htmlFor='email'>
        Email
      </label>
      <input
        className={styles.input}
        id='email'
        name='email'
        type='email'
        required
        autoComplete='email'
      />
    </div>
  );
}

export function PasswordField() {
  return (
    <div className={styles.formField}>
      <label className={styles.formLabel} htmlFor='password'>
        Password
      </label>
      <input
        className={styles.input}
        id='password'
        type='password'
        name='password'
        required
        autoComplete='current-password'
      />
    </div>
  );
}

export function UsernameField() {
  return (
    <div className={styles.formField}>
      <label className={styles.formLabel} htmlFor='username'>
        Username
      </label>
      <input
        className={styles.input}
        id='username'
        type='text'
        name='username'
        autoComplete='username'
        required
      />
    </div>
  );
}
