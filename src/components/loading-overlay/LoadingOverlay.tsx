import { SmartLoadingMessage } from '../smart-loading-message/SmartLoadingMessage';
import styles from './LoadingOverlay.module.scss';

export function LoadingOverlay() {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <SmartLoadingMessage className={styles.loadingMessage} />
    </div>
  );
}
