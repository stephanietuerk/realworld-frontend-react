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
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!login.data) return;
    closeModal();
  }, [login.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const { email, password } = formValues;
    login.mutate(
      { email, password },
      {
        onError: (error) => {
          console.log('Registration error:', error);
          const fieldErrors: { [key: string]: string } = {};
          error.fieldErrors?.forEach((fe) => {
            fieldErrors[fe.field] = fe.message;
          });
          setFieldErrors(fieldErrors);
        },
      },
    );
  };

  const handleFieldChange =
    (field: keyof typeof formValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormValues((prev) => ({ ...prev, [field]: value }));

      // Clear error for that field
      setFieldErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
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
      <EmailField
        value={formValues.email}
        onChange={handleFieldChange('email')}
        error={fieldErrors.email}
      />
      <PasswordField
        value={formValues.password}
        onChange={handleFieldChange('password')}
        error={fieldErrors.password}
      />
    </AuthModal>
  );
}
