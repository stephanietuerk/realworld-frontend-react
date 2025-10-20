import { useComments, type Comment } from '../../../api/useComments';
import { useDeleteComment } from '../../../api/useDeleteComment';
import { usePostComment } from '../../../api/usePostComment';
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
  const postComment = usePostComment(slug);
  const deleteComment = useDeleteComment(slug);

  const handlePostComment = (body: string) => {
    if (!body.trim()) return;
    postComment.mutate(body);
  };

  const handleDeleteComment = (comment: Comment) => {
    if (!comment) return;
    deleteComment.mutate(comment.id);
  };

  return (
    <div className={styles.comments}>
      <p className={styles.header}>Comments</p>
      <LeaveComment handlePost={handlePostComment}></LeaveComment>
      {(!comments || comments.length < 1) && (
        <p className={styles.noComments}>No comments yet</p>
      )}
      {comments?.map((comment) => (
        <CommentDisplay
          key={comment.id}
          comment={comment}
          handleDelete={handleDeleteComment}
        />
      ))}
    </div>
  );
}
