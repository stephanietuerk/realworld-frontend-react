import { useEffect, useRef, useState } from 'react';
import { useComments } from '../../../api/useComments';
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
  const { comments, refetch } = useComments(slug);
  const [bodyToPost, setBodyToPost] = useState<string | undefined>(undefined);
  const { comment: postedComment } = usePostComment(slug, bodyToPost);

  const lastPostedId = useRef<number | null>(null);

  useEffect(() => {
    if (!postedComment) return;
    if (postedComment.id === lastPostedId.current) return;
    lastPostedId.current = postedComment.id;
    refetch();
    setBodyToPost(undefined);
  }, [postedComment, refetch]);

  const handlePost = (body: string) => {
    if (!body.trim()) return;
    setBodyToPost(body);
  };

  return (
    <div className={styles.comments}>
      <p className={styles.header}>Comments</p>
      <LeaveComment handlePost={handlePost}></LeaveComment>
      {(!comments || comments.length < 1) && (
        <p className={styles.noComments}>No comments yet</p>
      )}
      {comments?.map((comment) => (
        <CommentDisplay key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
