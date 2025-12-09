import { ExternalLink } from 'lucide-react';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import styles from './AboutModal.module.scss';
import { useAboutModal } from './useAboutModal';

export default function AboutModal() {
  const { isModalVisible, dismissModal } = useAboutModal();

  if (!isModalVisible) return null;

  return (
    <Modal
      closeModal={() => dismissModal(false)}
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
        opportunities for learning.
      </p>
      <p className={styles.description}>
        The frontend was built from scratch with React, Vite, TanStack Query, a
        few unstyled Radix components, and Lucide icons. (I don't currently use
        React professionally, but wanted to make sure that I could if
        opportunity presented itself.) I intentionally tried to minimize the
        number of packages I brought in so that I could focus on low-level work
        directly with React.
      </p>
      <p className={styles.description}>
        I forked the official Node/Express/Prisma backend and modified it to fix
        known issues, update packages and deploy. It conforms to the official
        endpoints spec completely.
      </p>
      <p className={styles.description}>
        You can view the{' '}
        <a
          href='https://github.com/stephanietuerk/realworld-frontend-react'
          target='_blank'
          rel='noreferrer'
          className={styles.link}
        >
          source code
          <ExternalLink
            className={styles.openInNewIcon}
            size={14}
            strokeWidth={2}
          />
        </a>{' '}
        for both the frontend and backend on GitHub. Please note that this not a
        production-quality application.
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
      <p className={styles.instructions}>
        To allow this message to appear again on page reload, close this modal
        by clicking the close button in the top right corner. To dismiss the
        message forever, click the button below.
      </p>
      <Button
        className={styles.dismissButton}
        onClick={() => dismissModal(true)}
        size='lg'
      >
        Got it, show me the app
      </Button>
    </Modal>
  );
}
