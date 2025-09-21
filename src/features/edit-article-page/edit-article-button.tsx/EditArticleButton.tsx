import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './EditArticleButton.module.scss';
import { ROUTE } from '../../../shared/constants/routing';
import Button from '../../../components/button/Button';
import EditIcon from '../../../components/icons/EditIcon';
import SaveIcon from '../../../components/icons/SaveIcon';

export default function EditArticleButton({
  disabled,
  onSave,
}: {
  disabled?: boolean;
  onSave: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();

  const isEditPage = location.pathname.includes('/editor');

  const navigateToPage = () => {
    if (slug && !isEditPage) {
      navigate(ROUTE.editor(slug));
    }
    if (slug && isEditPage) {
      onSave();
      navigate(ROUTE.article(slug));
    }
  };

  return (
    <Button
      variant={isEditPage ? 'primary' : 'tertiary'}
      className={styles.sidebarEditButton}
      disabled={disabled}
      onClick={navigateToPage}
    >
      {isEditPage ? (
        <SaveIcon size={20} className={styles.editIcon}></SaveIcon>
      ) : (
        <EditIcon size={20} className={styles.editIcon}></EditIcon>
      )}
      {isEditPage ? 'Save changes' : 'Edit this article'}
    </Button>
  );
}
