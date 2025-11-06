import { clsx } from 'clsx';
import { FocusTrap } from 'focus-trap-react';
import { useRef, type PropsWithChildren } from 'react';
import CancelIcon from '../icons/CancelIcon';
import styles from './Modal.module.scss';

export default function Modal({
  closeModal,
  closeButtonAriaLabel,
  overlayClassName,
  backdropClassName,
  dialogClassName,
  children,
}: PropsWithChildren<{
  closeModal: () => void;
  closeButtonAriaLabel?: string;
  overlayClassName?: string;
  backdropClassName?: string;
  dialogClassName?: string;
}>) {
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <div className={clsx(styles.overlay, overlayClassName)}>
      <div className={clsx(styles.backdrop, backdropClassName)}></div>
      <FocusTrap focusTrapOptions={{ initialFocus: () => modalRef.current }}>
        <div
          ref={modalRef}
          tabIndex={-1}
          className={clsx(styles.dialog, dialogClassName)}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            aria-label={closeButtonAriaLabel || 'Close modal'}
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
          {children}
        </div>
      </FocusTrap>
    </div>
  );
}
