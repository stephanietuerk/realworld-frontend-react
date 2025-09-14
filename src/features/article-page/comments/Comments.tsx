import { useCallback, useState } from 'react';
import { useComments, type Comment } from '../../../api/useComments';
import { usePostComment } from '../../../api/usePostComment';
import {
  CommentDisplay,
  LeaveComment,
} from '../comment-display/CommentDisplay';
import styles from './Comments.module.scss';
import { useDeleteComment } from '../../../api/useDeleteComment';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const { comments, refetch } = useComments(slug);
  const [bodyToPost, setBodyToPost] = useState<string | undefined>(undefined);
  const [commentIdToDelete, setCommentIdToDelete] = useState<
    number | undefined
  >(undefined);

  const onSuccessfulPost = useCallback(() => {
    refetch();
    setBodyToPost(undefined);
  }, [refetch]);

  const onSuccessfulDelete = useCallback(() => {
    refetch();
    setCommentIdToDelete(undefined);
  }, [refetch]);

  const { isLoading: isPosting } = usePostComment(
    bodyToPost ? slug : undefined,
    bodyToPost,
    onSuccessfulPost,
  );

  const { isLoading: isDeleting } = useDeleteComment(
    commentIdToDelete ? slug : undefined,
    commentIdToDelete ?? undefined,
    onSuccessfulDelete,
  );

  const handlePostComment = (body: string) => {
    if (!body.trim() || isPosting) return;
    setBodyToPost(body);
  };

  const handleDeleteComment = (comment: Comment) => {
    if (!comment || isDeleting) return;
    setCommentIdToDelete(comment.id);
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
