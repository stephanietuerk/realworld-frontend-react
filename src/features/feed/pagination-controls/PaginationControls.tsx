import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PaginationControls.module.scss';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const range = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goBack = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goForward = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return totalPages < 2 ? null : (
    <div className={styles.controls}>
      <button
        onClick={goBack}
        disabled={currentPage === 1}
        className={styles.directionButton}
        aria-label='View previous page of articles'
      >
        <ChevronLeft
          className={
            currentPage === 1
              ? styles.directionIconDisabled
              : styles.directionIcon
          }
          strokeWidth={1.5}
        />
      </button>
      {range.map((page) => (
        <button
          key={page}
          disabled={page === currentPage}
          className={clsx(
            styles.pageButton,
            page === currentPage && styles.active,
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={goForward}
        disabled={currentPage === totalPages}
        className={styles.directionButton}
        aria-label='View next page of articles'
      >
        <ChevronRight
          className={
            currentPage === totalPages
              ? styles.directionIconDisabled
              : styles.directionIcon
          }
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
}
