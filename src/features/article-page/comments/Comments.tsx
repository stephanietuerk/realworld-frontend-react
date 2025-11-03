import { useComments } from '../../../api/useComments';
import {
  CommentDisplay,
  LeaveComment,
} from '../comment-display/CommentDisplay';
import styles from './Comments.module.scss';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const { comments } = useComments(slug);

  return (
    <div className={styles.comments}>
      <p className={styles.header}>Comments</p>
  <LeaveComment slug={slug} />
      {(!comments || comments.length < 1) && (
        <p className={styles.noComments}>No comments yet</p>
      )}
      {comments?.map((comment) => (
        <CommentDisplay key={comment.id} comment={comment} slug={slug} />
      ))}
    </div>
  );
}
