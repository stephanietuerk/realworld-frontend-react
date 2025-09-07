import type { Comment } from '../../../api/useComments';
import styles from './CommentDisplay.module.scss';

export default function CommentDisplay({ c }: { c: Comment }) {
  return (
    <div className={styles.comment}>
      <div
        className={styles.commentBody}
        dangerouslySetInnerHTML={{ __html: c.body }}
      ></div>
      <div className={styles.commentAuthor}>
        <p>{c.author.username}</p>
      </div>
    </div>
  );
}
