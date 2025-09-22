import { useState } from 'react';
import type { Comment } from '../../../api/useComments';
import { useAuthenticatedUser } from '../../../api/useAuthenticatedUser';
import styles from './CommentDisplay.module.scss';
import Button from '../../../components/button/Button';
import AuthorDate from '../../../components/author-date/AuthorDate';

interface CommentDisplayProps {
  comment: Comment;
  handleDelete: (comment: Comment) => void;
}

export function CommentDisplay({ comment, handleDelete }: CommentDisplayProps) {
  const { user: loggedInUser } = useAuthenticatedUser();
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

interface LeaveCommentProps {
  handlePost: (body: string) => void;
}

export function LeaveComment({ handlePost }: LeaveCommentProps) {
  // parent component ensures user is defined
  const { user } = useAuthenticatedUser();
  const [body, setBody] = useState('');

  if (!user) {
    return null;
  }

  const localHandlePost = () => {
    handlePost(body);
    setBody('');
  };

  return (
    <form className={styles.leaveComment}>
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
            onClick={localHandlePost}
          >
            Post comment
          </Button>
        </div>
      </div>
    </form>
  );
}
