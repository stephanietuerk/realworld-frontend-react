import { clsx } from 'clsx';
import { APP_NAME } from '../../shared/constants/app';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.widthContainer}>
        <p>
          <span className={clsx(styles.name, styles.text)}>{APP_NAME}</span>
          <span className={styles.text}>©2025.</span>
        </p>
        <p className={styles.text}>
          An interactive learning project from{' '}
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
