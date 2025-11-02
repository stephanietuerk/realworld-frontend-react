import { Link } from 'react-router-dom';
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
            {line.includes('__ACTION__') && action ? (
              <>
                {line.split('__ACTION__')[0]}
                <Link to={action.route} className={styles.actionLink}>
                  {action.text}
                </Link>
                {line.split('__ACTION__')[1]}
              </>
            ) : (
              line
            )}
          </p>
        ) : null,
      )}
    </section>
  );
}
