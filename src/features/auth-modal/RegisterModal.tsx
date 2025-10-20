import { useState } from 'react';
import { useAuth } from '../../api/useAuth';
import { useRegisterUser } from '../../api/useRegister';
import { ROUTE } from '../../shared/constants/routing';
import { EmailField, PasswordField, UsernameField } from './AuthFields';
import AuthModal from './AuthModal';

export default function RegisterModal() {
  const { setToken } = useAuth();
  const register = useRegisterUser(setToken);
  const [formValidity] = useState<boolean>(false);

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
    register.mutate({ username, email, password });
  };

  return (
    <AuthModal
      title='Sign up'
      altAuthRoute={ROUTE.login}
      altAuthLabel='Have an account?'
      submitLabel='Sign up'
      handleSubmit={handleSubmit}
      formValidity={formValidity}
      isSubmitting={register.isPending}
      submitError={register.error ? 'error' : null}
      key='Register'
    >
      <UsernameField />
      <EmailField />
      <PasswordField />
    </AuthModal>
  );
}
