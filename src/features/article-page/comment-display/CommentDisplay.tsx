import { useState } from 'react';
import type { Comment } from '../../../api/useComments';
import { useUser } from '../../../api/useUser';
import styles from './CommentDisplay.module.scss';
import Button from '../../../components/button/Button';
import AuthorDate from '../../../components/author-date/AuthorDate';

export function CommentDisplay({ comment }: { comment: Comment }) {
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
          layout="inline"
          updatedAt={comment.updatedAt}
        />
      </div>
    </div>
  );
}

export function LeaveComment() {
  // parent component ensures user is defined
  const { user } = useUser();
  const [body, setBody] = useState('');

  if (!user) {
    return null;
  }

  return (
    <form className={styles.leaveComment}>
      <div className={styles.comment}>
        <textarea
          className={styles.textarea}
          id="leave-comment"
          autoComplete="off"
          aria-label="Write a comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a comment..."
        ></textarea>
        <div className={styles.commentAuthor}>
          <Button className={styles.postButton} variant="primary" size="md">
            Post comment
          </Button>
        </div>
      </div>
    </form>
  );
}
