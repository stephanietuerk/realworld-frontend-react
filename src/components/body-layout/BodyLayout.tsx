import clsx from 'clsx';
import type { ReactNode } from 'react';
import { SmartLoadingMessage } from '../smart-loading-message/SmartLoadingMessage';
import styles from './BodyLayout.module.scss';

export default function BodyLayout({
  children,
  className,
  showLoadingSpinner,
}: {
  children: ReactNode;
  className?: string;
  showLoadingSpinner?: boolean;
}) {
  return (
    <div className={clsx(styles.bodyLayout, className)}>
      {children}
      {showLoadingSpinner && (
        <div className={styles.loadingSpinnerContainer}>
          <SmartLoadingMessage className={styles.loadingMessage} />
        </div>
      )}
    </div>
  );
}
