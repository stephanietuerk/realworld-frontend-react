import clsx from 'clsx';
import styles from './Field.module.scss';
import AddAddedIcon from '../icons/AddAddedIcon';

interface FieldProps extends React.PropsWithChildren {
  className?: string;
  id: string;
  label: string;
  required?: boolean;
  showStatus?: boolean;
  valid?: boolean;
}

export default function Field({
  className,
  id,
  label,
  required,
  showStatus = true,
  valid,
  children,
}: FieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        <span>{label}</span>
        {showStatus && (
          <span
            className={clsx(
              required ? styles.required : styles.optional,
              required && valid && styles.valid,
            )}
          >
            <>
              {valid && required && (
                <AddAddedIcon
                  variant='check'
                  size={12}
                  pathClassName={styles.check}
                />
              )}
              <span className={styles.requiredLabel}>
                {required ? 'required' : 'optional'}
              </span>
            </>
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
