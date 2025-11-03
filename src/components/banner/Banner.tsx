import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Banner.module.scss';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';

interface BannerProps {
  breadcrumbs?: { display: string; route: string }[];
  outerContainerClassName?: string;
  contentClassName?: string;
  surface?: 'light' | 'dark';
  children: ReactNode;
}

export default function Banner({
  breadcrumbs,
  outerContainerClassName: className,
  contentClassName,
  surface = 'light',
  children,
}: BannerProps) {
  return (
    <div className={clsx(styles.banner, className)} data-surface={surface}>
      <div className={clsx(styles.contentContainer, contentClassName)}>
        {breadcrumbs && (
          <div className={styles.breadcrumbs}>
            <Breadcrumbs segments={breadcrumbs} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
