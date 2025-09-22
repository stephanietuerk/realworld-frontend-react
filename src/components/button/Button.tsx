import clsx from 'clsx';
import type {
  PointerEventHandler,
  ReactEventHandler,
  ReactNode,
  RefObject,
} from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  animateOnClick?: boolean;
  busy?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: ReactEventHandler<HTMLButtonElement>;
  onPointerEnter?: PointerEventHandler<HTMLButtonElement>;
  onPointerLeave?: PointerEventHandler<HTMLButtonElement>;
  pressed?: boolean;
  ref?: RefObject<HTMLButtonElement>;
  size?: ButtonSize;
  type?: ButtonType;
  variant?: ButtonVariant;
  children: ReactNode;
}

export default function Button({
  animateOnClick = true,
  busy,
  className,
  disabled,
  variant = 'primary',
  onClick,
  onPointerEnter,
  onPointerLeave,
  pressed,
  ref,
  size = 'md',
  type,
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.btn,
        styles[variant],
        styles[size],
        animateOnClick && styles.animateOnClick,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      aria-pressed={pressed}
      aria-busy={busy}
      ref={ref}
      type={type ?? 'button'}
    >
      {children}
    </button>
  );
}
