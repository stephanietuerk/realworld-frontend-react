import Banner from '../../components/banner/Banner';
import MainLayout from '../../components/main-layout/MainLayout';
import { ErrorBoundary } from '../../shared/utilities/error-boundary';
import styles from './SettingsPage.module.scss';

export default function SettingsPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <ErrorBoundary
      fallback={<p>Oops, error</p>}
      onError={(error, info) => console.log(error, info)}
    >
      <Banner
        outerContainerClassName={styles.bannerOuter}
        contentClassName={styles.bannerContent}
      >
        <div className={styles.titleRow}>
          <h1 className={styles.bannerTitle}>Settings</h1>
        </div>
      </Banner>
      <MainLayout>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <fieldset className={styles.fieldset}></fieldset>
          {/*<Field
            id={id}
            label='Article title'
            showStatus={false}
            className={fieldClassName}
          >
            <input
              id={id}
              name='title'
              type='text'
              value={value}
              required
              autoComplete='off'
              className={clsx(
                styles.input,
                styles.inputTitle,
                formControlClassName,
              )}
              placeholder='Article Title'
              onChange={onChange}
            />
          </Field>*/}
          <>
            {/*{error && (
              <p className={styles.error}>
                Update was not successful. Please try again.
              </p>
            )}*/}
            {/*<Button
              className={styles.button}
              variant='primary'
              type='submit'
              disabled={!canSubmit || isLoading}
              busy={isLoading}
            >
              Publish article
            </Button>*/}
          </>
        </form>
      </MainLayout>
    </ErrorBoundary>
  );
}
