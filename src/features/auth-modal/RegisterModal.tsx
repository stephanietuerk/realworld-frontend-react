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
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  // const updateValidityFrom = (el: HTMLInputElement) => {
  //   setFormValidity(el.form?.checkValidity() ?? false);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const { username, email, password } = formValues;
    register.mutate(
      { username, email, password },
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
      title='Sign up'
      altAuthRoute={ROUTE.login}
      altAuthLabel='Have an account?'
      submitLabel='Sign up'
      handleSubmit={handleSubmit}
      formValidity={formValidity}
      isSubmitting={register.isPending}
      submitError={fieldErrors ? null : register.error}
      key='Register'
    >
      <UsernameField
        value={formValues.username}
        onChange={handleFieldChange('username')}
        error={fieldErrors.username}
      />
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
