import { register } from '../../api/authenticate';
import { useAuth } from '../../api/useAuth';
import { ROUTE } from '../../shared/constants/routing';
import AuthModal from './AuthModal';
import styles from './ImplementedModal.module.scss';

export default function RegisterModal() {
  const { setToken } = useAuth();

  const handleInput = (
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    setError(null);
  };

  const handleSubmit = async (
    formData: FormData,
    closeModal: () => void,
    handleAuthError: (err: unknown) => void,
  ): Promise<void> => {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      const response = await register(username, email, password);
      setToken(response.user.token);
      closeModal();
    } catch (err) {
      handleAuthError(err);
    }
  };

  return (
    <AuthModal
      title="Sign up"
      altAuthRoute={ROUTE.login}
      altAuthLabel="Have an account?"
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      submitLabel="Sign up"
      key="Register"
    >
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="username">
          Username
        </label>
        <input
          className={styles.input}
          type="text"
          name="username"
          id="register-username"
          required
        />
      </div>
      <div
        className={styles.formField}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <label className={styles.formLabel} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="email"
          name="email"
          id="register-email"
          required
        />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="password">
          Create a password
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="register-password"
          required
        />
      </div>
    </AuthModal>
  );
}
