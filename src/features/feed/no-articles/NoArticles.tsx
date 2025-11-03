import { Newspaper, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/routing';
import styles from './NoArticles.module.scss';

export default function NoArticles({
  title,
  body,
  action,
}: {
  title: string;
  body: (string | undefined)[];
  action: { text: string; route: string } | undefined;
}) {
  return (
    <section className={styles.section} aria-live='polite'>
      <h2 className={styles.title}>{title}</h2>
      {body.map((line, index) =>
        line ? (
          <p key={index} className={styles.text}>
            {line}
          </p>
        ) : null,
      )}
      {action ? (
        <Link to={action.route} className={styles.action}>
          <>
            <span className={styles.actionIcon}>
              {action.route === ROUTE.explore ? (
                <Newspaper size={20} />
              ) : (
                <Pencil size={20} />
              )}
            </span>
            <span className={styles.actionText}>{action.text}</span>
          </>
        </Link>
      ) : null}
    </section>
  );
}
