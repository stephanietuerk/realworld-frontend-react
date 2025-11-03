import { Trash } from 'lucide-react';
import { AlertDialog } from 'radix-ui';
import { useNavigate } from 'react-router-dom';
import { useDeleteArticle } from '../../../api/useDeleteArticle';
import Button from '../../../components/button/Button';
import { ROUTE } from '../../../shared/constants/routing';
import type { Article } from '../../../shared/types/feed.types';
import styles from './DeleteArticle.module.scss';

interface DeleteArticleProps {
  disabled?: boolean;
  article: Article;
}

export default function DeleteArticle({
  disabled,
  article,
}: DeleteArticleProps) {
  const navigate = useNavigate();
  const deleteArticle = useDeleteArticle(article.slug);

  const navigateToProfile = () => {
    if (article) {
      navigate(ROUTE.profile(article.author.username));
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button
          variant='tertiary'
          className={styles.deleteButton}
          disabled={disabled}
        >
          <Trash size={16} className={styles.deleteIcon} />
          <span className={styles.deleteLabel}>Delete article</span>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.alertDialogOverlay} />
        <AlertDialog.Content className={styles.alertDialogContent}>
          <AlertDialog.Title className={styles.alertDialogTitle}>
            Are you sure?
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.alertDialogDescription}>
            This action cannot be undone. This will permanently delete this
            article.
          </AlertDialog.Description>
          <div className={styles.modalButtonRow}>
            <AlertDialog.Cancel asChild>
              <Button
                variant='tertiary'
                className={styles.modalCancelButton}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.deleteLabel}>Cancel</span>
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                variant='primary'
                className={styles.modalDeleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteArticle.mutate();
                  navigateToProfile();
                }}
              >
                <span className={styles.deleteLabel}>Yes, delete article</span>
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
