import { ExternalLink } from 'lucide-react';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import styles from './AboutModal.module.scss';
import { useAboutModal } from './useAboutModal';
import { Square, SquareCheck } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { PREVENT_MODAL_TOKEN } from '../../context/about-modal-context';

export default function AboutModal() {
  const { isModalVisible, dismissModal } = useAboutModal();
  const [showModalAgain, setShowModalAgain] = useState(
    localStorage.getItem(PREVENT_MODAL_TOKEN) === 'false',
  );

  if (!isModalVisible) return null;

  return (
    <Modal
      closeModal={() => dismissModal(!showModalAgain)}
      dialogClassName={styles.modal}
      closeButtonAriaLabel='Close modal and allow it to be shown again on load'
    >
      <h2 className={styles.title}>Hi there!</h2>
      <p className={styles.description}>
        This is a full-stack implementation of the{' '}
        <a
          href='https://github.com/gothinkster/realworld'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          RealWorld app
          <ExternalLink
            className={styles.openInNewIcon}
            size={14}
            strokeWidth={2}
          />
        </a>{' '}
        that I built for learning and demonstration purposes. The site is fully
        functional, so feel free to create an account, write an article, edit
        it, leave comments, and otherwise poke around. (The DB is reset nightly
        though, so don't get too attached to your content.)
      </p>
      <p className={styles.description}>
        {' '}
        If you compare this site to the{' '}
        <a
          href='https://demo.realworld.show'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          official demo
          <ExternalLink
            className={styles.openInNewIcon}
            size={14}
            strokeWidth={2}
          />
        </a>
        , you'll see that I made quite a few changes to the UI and UX. That
        wasn't my original goal, but the improved UX made the entire app easier
        to reason about, and the additional frontend functionality created more
        opportunities for learning. You can read about the UX enhancements{' '}
        <a
          href='https://github.com/stephanietuerk/realworld-frontend-react?tab=readme-ov-file#ux-improvements-not-in-realworld-spec---couldnt-help-myself--'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          here
          <ExternalLink
            className={styles.openInNewIcon}
            size={14}
            strokeWidth={2}
          />
        </a>
        .
      </p>
      <p className={styles.description}>
        The frontend was built from scratch with React, Vite, TanStack Query, a
        few unstyled Radix components, and Lucide icons. I intentionally tried
        to minimize the number of packages I brought in so that I could focus on
        low-level work directly with React. I built this to ensure that I could
        effectively contribute to a React stack should the opportunity arise,
        since currently I don't use it at my job.
      </p>
      <p className={styles.description}>
        I forked the official Node/Express/Prisma backend and modified it to fix
        known issues, update packages and deploy. It conforms to the official
        endpoints spec completely.
      </p>
      <p className={styles.description}>
        You can view the source code for both the{' '}
        <a
          href='https://github.com/stephanietuerk/realworld-frontend-react'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          frontend
          <ExternalLink
            className={styles.openInNewIcon}
            size={14}
            strokeWidth={2}
          />
        </a>{' '}
        and{' '}
        <a
          href='https://github.com/stephanietuerk/realworld-backend-node'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          backend
          <ExternalLink
            className={styles.openInNewIcon}
            size={14}
            strokeWidth={2}
          />
        </a>{' '}
        on GitHub. Please note that this not a production-quality application.
      </p>
      <p className={styles.description}>
        If you are curious to learn more about me or want to get in touch, you
        can visit{' '}
        <a
          href='https://stephanietuerk.net/main'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          my personal website
          <ExternalLink
            className={styles.openInNewIcon}
            size={14}
            strokeWidth={2}
          />
        </a>
        .
      </p>
      <div
        className={clsx(
          styles.showMessageAgainRow,
          showModalAgain && styles.showMessageSelected,
        )}
        role='button'
        onClick={() => {
          setShowModalAgain(!showModalAgain);
        }}
      >
        {showModalAgain ? (
          <SquareCheck
            className={clsx(
              styles.showMessageIcon,
              showModalAgain && styles.checkboxSelected,
            )}
          />
        ) : (
          <Square className={clsx(styles.showMessageIcon)} />
        )}
        <span className={clsx(styles.showMessageAgainText)}>
          Continue showing this message on app load
        </span>
      </div>
      <Button
        className={styles.dismissButton}
        onClick={() => dismissModal(!showModalAgain)}
        size='lg'
      >
        Got it, show me the app
      </Button>
    </Modal>
  );
}
