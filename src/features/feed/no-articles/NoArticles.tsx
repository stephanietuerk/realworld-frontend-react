import { Newspaper, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FeedAction } from '../../../shared/types/feed.types';
import { ROUTE } from '../../../shared/constants/routing';
import styles from './NoArticles.module.scss';

export default function NoArticles({
  title,
  body,
  action,
}: {
  title: string;
  body: (string | undefined)[];
  action: FeedAction | undefined;
}) {
  const isRouteAction = action && 'route' in action;
  const isCallbackAction = action && 'onClick' in action;

  const icon =
    isRouteAction && action.route === ROUTE.explore ? (
      <Newspaper size={20} />
    ) : (
      <Pencil size={20} />
    );

  const actionContent = action ? (
    <>
      <span className={styles.actionIcon}>{icon}</span>
      <span className={styles.actionText}>{action.text}</span>
    </>
  ) : null;

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
      {isRouteAction ? (
        <Link to={action.route} className={styles.action}>
          {actionContent}
        </Link>
      ) : isCallbackAction ? (
        <button onClick={action.onClick} className={styles.action}>
          {actionContent}
        </button>
      ) : null}
    </section>
  );
}
