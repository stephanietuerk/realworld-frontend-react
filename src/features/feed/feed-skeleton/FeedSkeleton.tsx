import styles from './FeedSkeleton.module.scss';

export default function FeedSkeleton() {
  return (
    <div className={styles.loadingContainer}>
  <div className={styles.skeletonCard} />
  <div className={styles.skeletonCard} />
  <div className={styles.skeletonCard} />
    </div>
  );
}
