import { useComments } from '../../../api/useComments';
import CommentDisplay from '../comment-display/CommentDisplay';
import styles from './Comments.module.scss';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const { comments } = useComments(slug);
  return (
    <div className={styles.comments}>
      {comments?.map((c) => (
        <CommentDisplay key={c.id} c={c} />
      ))}
    </div>
  );
}
