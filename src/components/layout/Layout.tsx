import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';
import styles from './Layout.module.scss';

// Main layout container underneath banner, provides side padding
export function ContentSidePaddingLayout({ children }: PropsWithChildren<{}>) {
  return <div className={styles.contentSidePaddingLayout}>{children}</div>;
}

// Layout with max width for content area
export function ContentMaxWidthLayout({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div className={clsx(styles.contentMaxWidthLayout, className)}>
      {children}
    </div>
  );
}

// Layout for sidebar area
export function SidebarLayout({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(styles.sidebarLayout, className)}>{children}</div>
  );
}

// Layout for main article content area -- article cards, article body, etc.
export function ArticleContentLayout({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(styles.contentLayout, className)}>{children}</div>
  );
}

// Layout for text content within an article body
export function ArticleTextLayout({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx(styles.textLayout, className)}>{children}</div>;
}
