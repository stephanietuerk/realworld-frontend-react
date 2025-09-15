import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './BodyLayout.module.scss';

export default function BodyLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.bodyLayout, className)}>{children}</div>;
}
