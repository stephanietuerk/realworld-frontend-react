import { useEffect, useState } from 'react';
import { useAuth } from '../../api/useAuth';
import { ROUTE } from '../../shared/constants/routing';
import AuthModal from './AuthModal';
import type { UserLogin } from '../../shared/types/user.types';
import { useCloseModal } from './useCloseModal';
import { useUiError } from '../../shared/utilities/useUiError';
import { EmailField, PasswordField } from './AuthFields';
import { useLoginUser } from '../../api/useLogin';

export default function LoginModal() {
  const { setToken } = useAuth();
  const closeModal = useCloseModal();
  const [login, setLogin] = useState<UserLogin | undefined>(undefined);
  const {
    user: loggedInUser,
    isLoading,
    error,
  } = useLoginUser({
    body: login,
    onSuccess: () => {},
  });
  const uiError = useUiError(error);
  const [formValidity] = useState<boolean>(false);

  useEffect(() => {
    if (!loggedInUser) return;
    setToken(loggedInUser.token);
    closeModal();
  }, [loggedInUser, setToken, closeModal]);

  // const updateValidityFrom = (el: HTMLInputElement) => {
  //   el.setCustomValidity('');
  //   setFormValidity(el.form?.checkValidity() ?? false);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    setLogin({ email, password });
  };

  return (
    <AuthModal
      title='Sign in'
      altAuthRoute={ROUTE.register}
      altAuthLabel='Need an account?'
      submitLabel='Sign in'
      handleSubmit={handleSubmit}
      formValidity={formValidity}
      isSubmitting={isLoading}
      submitError={uiError?.message || null}
      key='Login'
    >
      <EmailField />
      <PasswordField />
    </AuthModal>
  );
}
