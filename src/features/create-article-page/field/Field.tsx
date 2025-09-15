import clsx from 'clsx';
import styles from './Field.module.scss';
import AddAddedIcon from '../../../components/icons/AddAddedIcon';

export default function Field({
  id,
  label,
  required,
  showStatus = true,
  valid,
  children,
}: React.PropsWithChildren<{
  id: string;
  label: string;
  required?: boolean;
  showStatus?: boolean;
  valid?: boolean;
}>) {
  return (
    <div className={styles.field}>
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
