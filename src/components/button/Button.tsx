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
      className={clsx(styles.btn, styles[variant], styles[size], className)}
      disabled={disabled}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      aria-pressed={pressed}
      ref={ref}
      type={type ?? 'button'}
    >
      {children}
    </button>
  );
}
