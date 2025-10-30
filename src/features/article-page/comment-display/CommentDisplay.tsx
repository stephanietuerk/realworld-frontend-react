import { useCallback, useState } from 'react';
import { useAuthenticatedUser } from '../../../api/useAuthenticatedUser';
import type { Comment } from '../../../api/useComments';
import { useDeleteComment } from '../../../api/useDeleteComment';
import { usePostComment } from '../../../api/usePostComment';
import AuthorDate from '../../../components/author-date/AuthorDate';
import Button from '../../../components/button/Button';
import styles from './CommentDisplay.module.scss';

interface CommentDisplayProps {
  comment: Comment;
  slug: string;
}

export function CommentDisplay({ comment, slug }: CommentDisplayProps) {
  const { user: loggedInUser } = useAuthenticatedUser();
  const deleteComment = useDeleteComment(slug);

  const handleDelete = (comment: Comment) => {
    if (!comment) return;
    deleteComment.mutate(comment.id);
  };

  return (
    <div className={styles.comment}>
      <div
        className={styles.commentBody}
        dangerouslySetInnerHTML={{ __html: comment.body }}
      ></div>
      <div className={styles.commentAuthor}>
        <AuthorDate
          showDate={true}
          author={comment.author}
          layout='inline'
          updatedAt={comment.updatedAt}
        />
        {loggedInUser && comment.author.username === loggedInUser.username && (
          <Button variant='tertiary' onClick={() => handleDelete(comment)}>
            Delete comment
          </Button>
        )}
      </div>
    </div>
  );
}

export function LeaveComment({ slug }: { slug: string }) {
  // parent component ensures user is defined
  const { user } = useAuthenticatedUser();
  const [body, setBody] = useState('');
  const postComment = usePostComment(slug);

  const post = useCallback(() => {
    const trimmed = body.trim();
    if (!trimmed) return;
    postComment.mutate(body);
    setBody('');
  }, [body, slug]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.leaveComment}>
      <div className={styles.comment}>
        <textarea
          className={styles.textarea}
          id='leave-comment'
          autoComplete='off'
          aria-label='Write a comment'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Write a comment...'
        ></textarea>
        <div className={styles.commentAuthor}>
          <Button
            className={styles.postButton}
            variant='primary'
            size='md'
            type='button'
            onClick={post}
          >
            Post comment
          </Button>
        </div>
      </div>
    </div>
  );
}
