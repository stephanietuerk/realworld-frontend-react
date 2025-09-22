import { FocusTrap } from 'focus-trap-react';
import { Link, useLocation } from 'react-router-dom';
import CancelIcon from '../../components/icons/CancelIcon';
import styles from './AuthModal.module.scss';
import { useCloseModal } from './useCloseModal';
import { useRef, useState, useEffect } from 'react';

interface AuthModalProps extends React.PropsWithChildren {
  title: string;
  altAuthRoute: string;
  altAuthLabel: string;
  submitLabel: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  formValidity: boolean;
  isSubmitting: boolean;
  submitError: string | null;
}

export default function AuthModal({
  title,
  altAuthRoute: otherAuthRoute,
  altAuthLabel: otherAuthLabel,
  submitLabel,
  handleSubmit,
  isSubmitting,
  submitError,
  children,
}: AuthModalProps) {
  const location = useLocation();
  const closeModal = useCloseModal();
  const formRef = useRef<HTMLFormElement>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const recompute = () => setCanSubmit(form.checkValidity());
    recompute();

    form.addEventListener('input', recompute, true);
    form.addEventListener('blur', recompute, true);
    form.addEventListener('change', recompute, true);

    return () => {
      form.removeEventListener('input', recompute, true);
      form.removeEventListener('blur', recompute, true);
      form.removeEventListener('change', recompute, true);
    };
  }, []);

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
          {submitError && (
            <div className={styles.formMessage}>{submitError}</div>
          )}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.formRoot}
          >
            {children}
            <button
              className={styles.submitButton}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? 'Submitting…' : submitLabel}
            </button>
          </form>
        </div>
      </FocusTrap>
    </div>
  );
}
