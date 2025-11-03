import { useEffect, useState } from 'react';
import { useAuth } from '../../api/useAuth';
import { useLogin } from '../../api/useLogin';
import { ROUTE } from '../../shared/constants/routing';
import { EmailField, PasswordField } from './AuthFields';
import AuthModal from './AuthModal';
import { useCloseModal } from './useCloseModal';

export default function LoginModal() {
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
      <EmailField />
      <PasswordField />
    </AuthModal>
  );
}
