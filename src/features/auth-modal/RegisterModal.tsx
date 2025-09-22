import { useEffect, useState } from 'react';
import { useAuth } from '../../api/useAuth';
import { ROUTE } from '../../shared/constants/routing';
import AuthModal from './AuthModal';
import type { UserRegistration } from '../../shared/types/user.types';
import { useCloseModal } from './useCloseModal';
import { useUiError } from '../../shared/utilities/useUiError';
import { EmailField, PasswordField, UsernameField } from './AuthFields';
import { useRegisterUser } from '../../api/useRegister';

export default function RegisterModal() {
  const { setToken } = useAuth();
  const closeModal = useCloseModal();
  const [registration, setRegistration] = useState<
    UserRegistration | undefined
  >(undefined);
  const {
    user: registeredUser,
    isLoading,
    error,
  } = useRegisterUser({
    body: registration,
    onSuccess: () => {},
  });
  const uiError = useUiError(error);
  const [formValidity] = useState<boolean>(false);

  useEffect(() => {
    if (!registeredUser) return;
    setToken(registeredUser.token);
    closeModal();
  }, [registeredUser, setToken, closeModal]);

  // const updateValidityFrom = (el: HTMLInputElement) => {
  //   setFormValidity(el.form?.checkValidity() ?? false);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const username = String(formData.get('username') ?? '');
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    setRegistration({ username, email, password });
  };

  return (
    <AuthModal
      title='Sign up'
      altAuthRoute={ROUTE.login}
      altAuthLabel='Have an account?'
      submitLabel='Sign up'
      handleSubmit={handleSubmit}
      formValidity={formValidity}
      isSubmitting={isLoading}
      submitError={uiError?.message || null}
      key='Register'
    >
      <UsernameField />
      <EmailField />
      <PasswordField />
    </AuthModal>
  );
}
