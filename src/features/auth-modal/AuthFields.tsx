import styles from './AuthFields.module.scss';

// interface AuthFieldProps {
//   updateValidityFrom: (el: HTMLInputElement) => void;
// }

export function EmailField() {
  // const setMessage = useCallback((el: HTMLInputElement) => {
  //   el.setCustomValidity('');
  //   if (el.validity.valueMissing) {
  //     el.setCustomValidity('Email is required.');
  //   } else if (el.validity.typeMismatch) {
  //     el.setCustomValidity('Please enter a valid email address.');
  //   }
  // }, []);

  // const handleBlur = useCallback(
  //   (e: React.FocusEvent<HTMLInputElement>) => {
  //     const el = e.currentTarget;
  //     setMessage(el);
  //     updateValidityFrom?.(el);
  //   },
  //   [setMessage, updateValidityFrom],
  // );

  // const handleInvalid = useCallback(
  //   (e: React.FormEvent<HTMLInputElement>) => {
  //     const el = e.currentTarget;
  //     setMessage(el);
  //     updateValidityFrom?.(el);
  //   },
  //   [setMessage, updateValidityFrom],
  // );

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
        // onBlur={handleBlur}
        // onInvalid={handleInvalid}
      />
    </div>
  );
}

export function PasswordField() {
  // const setMessage = useCallback((el: HTMLInputElement) => {
  //   el.setCustomValidity('');
  //   if (el.validity.valueMissing) {
  //     el.setCustomValidity('Password is required.');
  //   }
  // }, []);

  // const handleBlur = useCallback(
  //   (e: React.FocusEvent<HTMLInputElement>) => {
  //     const el = e.currentTarget;
  //     setMessage(el);
  //     updateValidityFrom?.(el);
  //   },
  //   [setMessage, updateValidityFrom],
  // );

  // const handleInvalid = useCallback(
  //   (e: React.FormEvent<HTMLInputElement>) => {
  //     const el = e.currentTarget;
  //     setMessage(el);
  //     updateValidityFrom?.(el);
  //   },
  //   [setMessage, updateValidityFrom],
  // );

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
        // onBlur={handleBlur}
        // onInvalid={handleInvalid}
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
