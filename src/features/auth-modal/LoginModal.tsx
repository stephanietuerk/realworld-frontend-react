import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../api/useAuth';
import { useLogin } from '../../api/useLogin';
import { API_BROKEN_DATE } from '../../shared/constants/api';
import { ROUTE } from '../../shared/constants/routing';
import { EmailField, PasswordField } from './AuthFields';
import AuthModal from './AuthModal';
import styles from './AuthModal.module.scss';
import { useCloseModal } from './useCloseModal';

export default function LoginModal() {
  const location = useLocation();
  const { setToken } = useAuth();
  const closeModal = useCloseModal();
  const login = useLogin(setToken);
  const [formValidity] = useState<boolean>(false);

  useEffect(() => {
    if (!login.data) return;
    closeModal();
  }, [login.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const email = String(formData.get('email') ?? '')
      .trim()
      .toLowerCase();
    const password = String(formData.get('password') ?? '');
    login.mutate({ email, password });
  };

  return (
    <AuthModal
      title='Sign in'
      altAuthRoute={ROUTE.register}
      altAuthLabel='Need an account?'
      submitLabel='Sign in'
      handleSubmit={handleSubmit}
      formValidity={formValidity}
      isSubmitting={login.isPending}
      submitError={login.error}
      key='Login'
    >
      <p className={styles.apiWarning}>
        As of {API_BROKEN_DATE.login.toDateString()}, this functionality in the
        official Real World backend is not working. Use the{' '}
        <Link
          to={ROUTE.register}
          state={
            location.state?.backgroundLocation
              ? { backgroundLocation: location.state.backgroundLocation }
              : undefined
          }
        >
          <span className={styles.otherAuthLink}>Sign Up</span>
        </Link>{' '}
        functionality to enter the site as an authenticated user.
      </p>
      <EmailField />
      <PasswordField />
    </AuthModal>
  );
}
