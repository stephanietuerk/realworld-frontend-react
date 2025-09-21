import { FocusTrap } from 'focus-trap-react';
import {
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CancelIcon from '../../components/icons/CancelIcon';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  title: string;
  altAuthRoute: string;
  altAuthLabel: string;
  submitLabel: string;
  handleSubmit: (
    formData: FormData,
    closeModal: () => void,
    handleAuthError: (err: unknown) => void,
  ) => Promise<void>;
  handleInput: (setError: Dispatch<SetStateAction<string | null>>) => void;
  children: ReactNode;
}

export default function AuthModal({
  title,
  altAuthRoute: otherAuthRoute,
  altAuthLabel: otherAuthLabel,
  submitLabel,
  handleInput,
  handleSubmit,
  children,
}: AuthModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = (): void => {
    const background = location.state?.backgroundLocation;
    navigate(background || '/', { replace: true });
  };

  const handleInputLocal = (): void => {
    if (formRef.current) {
      setIsFormValid(formRef.current.checkValidity());
      handleInput(setError);
    }
  };

  const handleAuthError = (err: unknown): void => {
    if (err instanceof Error && 'code' in err) {
      if (err.code === 422) {
        setError('Invalid email or password.');
      } else if (err.code === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Login failed. Please try again.');
      }
    } else {
      setError('Login failed. Please try again.');
    }
  };

  const handleSubmitLocal = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await handleSubmit(formData, closeModal, handleAuthError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.backdrop}
        tabIndex={-1}
        onClick={closeModal}
        onKeyUp={(e) => {
          if (e.key === 'Escape') {
            closeModal();
          }
        }}
      ></div>
      <FocusTrap>
        <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
          <button
            ref={closeButtonRef}
            onClick={closeModal}
            aria-label='Close login modal'
            style={{
              alignSelf: 'flex-end',
              position: 'relative',
            }}
          >
            <CancelIcon
              size={28}
              svgClassName={styles.closeButtonSvg}
              circleClassName={styles.closeButtonCircle}
              lineClassName={styles.closeButtonLine}
            />
          </button>
          <h2 className={styles.signIn}>{title}</h2>
          <Link
            to={otherAuthRoute}
            state={
              location.state?.backgroundLocation
                ? { backgroundLocation: location.state.backgroundLocation }
                : undefined
            }
          >
            {otherAuthLabel}
          </Link>
          {error && <div className={styles.formMessage}>{error}</div>}
          <form
            ref={formRef}
            onInput={handleInputLocal}
            onSubmit={handleSubmitLocal}
            className={styles.formRoot}
            method='post'
            noValidate
          >
            {children}
            <button
              className={styles.submitButton}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Submitting…' : submitLabel}
            </button>
          </form>
        </div>
      </FocusTrap>
    </div>
  );
}
