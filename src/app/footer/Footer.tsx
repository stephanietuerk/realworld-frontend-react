import { APP_NAME } from '../../shared/constants/app';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.widthContainer}>
        <p className={styles.name}>{APP_NAME}</p>
        <p>
          ©2025. An interactive learning project from{' '}
          <a
            href='https://github.com/gothinkster/realworld'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
          >
            RealWorld OSS Project
          </a>
          .
        </p>
      </div>
    </div>
  );
}
