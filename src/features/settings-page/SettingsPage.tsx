import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { queryKeys } from '../../api/queryKeys';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import { useEditSettings } from '../../api/useEditSettings';
import Banner from '../../components/banner/Banner';
import Button from '../../components/button/Button';
import {
  ContentMaxWidthLayout,
  ContentSidePaddingLayout,
} from '../../components/layout/Layout';
import type {
  AuthenticatedUser,
  UserUpdate,
} from '../../shared/types/user.types';
import {
  BioField,
  EmailField,
  PasswordField,
  ProfileImageField,
  UsernameField,
} from './settings-fields/SettingsFields';
import styles from './SettingsPage.module.scss';

export interface FormUserSettings {
  image: string;
  username: string;
  bio: string;
  email: string;
  password: string;
}

interface UserUpdateItem {
  value: string;
  dirty: boolean;
}
export interface UserUpdates {
  image: UserUpdateItem;
  username: UserUpdateItem;
  bio: UserUpdateItem;
  email: UserUpdateItem;
  password: UserUpdateItem;
}

function initUserUpdates(user?: AuthenticatedUser): UserUpdates {
  return user
    ? {
        image: { value: user.image, dirty: false },
        username: { value: user.username, dirty: false },
        bio: { value: user.bio, dirty: false },
        email: { value: user.email, dirty: false },
        password: { value: '', dirty: false },
      }
    : {
        image: { value: '', dirty: false },
        username: { value: '', dirty: false },
        bio: { value: '', dirty: false },
        email: { value: '', dirty: false },
        password: { value: '', dirty: false },
      };
}

function isDirty(
  key: keyof FormUserSettings,
  content: string,
  user: AuthenticatedUser,
): boolean {
  let dirty: boolean;
  if (key === 'password') {
    dirty = true;
  } else {
    dirty = content !== user[key];
  }
  return dirty;
}

export default function SettingsPage() {
  const { user } = useAuthenticatedUser();
  const [updates, setUpdates] = useState<UserUpdates>(() =>
    initUserUpdates(user),
  );
  const [everUpdated, setEverUpdated] = useState(false);
  const [formVersion, setFormVersion] = useState(crypto.randomUUID());
  const [responseMessage, setResponseMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);
  const qc = useQueryClient();
  const editSettings = useEditSettings(user?.username);

  const dirty = Boolean(
    user &&
      (updates.image.dirty ||
        updates.username.dirty ||
        updates.bio.dirty ||
        updates.email.dirty ||
        updates.password.dirty),
  );

  useEffect(() => {
    if (dirty) setEverUpdated(true);
  }, [dirty]);

  useEffect(() => {
    if (!user) return;
    setUpdates(initUserUpdates(user));
  }, [user?.email, user?.username, user?.bio, user?.image]);

  useEffect(() => {
    if (responseMessage) {
      const timeout = setTimeout(() => setResponseMessage(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [responseMessage]);

  const updateSettings = (key: keyof FormUserSettings, content: string) => {
    setUpdates((prev) => ({
      ...prev,
      [key]: {
        value: content,
        dirty: isDirty(key, content, user!),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutation = {} as UserUpdate;
    (Object.keys(updates) as (keyof FormUserSettings)[]).forEach((key) => {
      if (updates[key].dirty) {
        (mutation as any)[key] = updates[key].value;
      }
    });
    editSettings.mutate(mutation, {
      onSuccess: (data) => {
        qc.setQueryData(queryKeys.loggedInUser(), data.user);
        setResponseMessage({
          text: 'Settings updated successfully',
          type: 'success',
        });
        revertChanges();
      },
      onError: () => {
        setResponseMessage({
          text: 'Failed to update settings',
          type: 'error',
        });
      },
    });
  };

  const revertChanges = () => {
    setUpdates(initUserUpdates(user));
    setFormVersion(crypto.randomUUID());
  };

  if (!user) return null;

  return (
    <>
      <Banner
        outerContainerClassName={styles.bannerOuter}
        contentClassName={styles.bannerContent}
      >
        <h1 className={styles.bannerTitle}>Settings</h1>
        <p className={styles.bannerDescription}>
          Modify your profile information
        </p>
      </Banner>
      <ContentSidePaddingLayout>
        <ContentMaxWidthLayout className={styles.contentMaxWidth}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            key={formVersion}
            noValidate
          >
            <fieldset className={styles.fieldset}>
              <ProfileImageField
                id='field-title'
                value={updates.image.value}
                onChange={(e) => updateSettings('image', e.target.value)}
              />
              <UsernameField
                id='field-username'
                value={updates.username.value}
                onChange={(e) => updateSettings('username', e.target.value)}
              />
              <BioField
                id='field-bio'
                value={updates.bio.value}
                onChange={(e) => updateSettings('bio', e.target.value)}
              />
              <EmailField
                id='field-email'
                value={updates.email.value}
                onChange={(e) => updateSettings('email', e.target.value)}
              />
              <PasswordField
                id='field-password'
                value={updates.password.value}
                onChange={(e) => updateSettings('password', e.target.value)}
              />
            </fieldset>
            <div className={styles.bottomRow}>
              <div className={styles.buttonRow}>
                {(everUpdated || dirty) && (
                  <Button
                    variant='tertiary'
                    className={styles.revertButton}
                    disabled={!dirty || editSettings.isPending}
                    onClick={revertChanges}
                  >
                    <RotateCcw size={18} className={styles.revertIcon} />
                    Revert all changes
                  </Button>
                )}
                <Button
                  className={styles.button}
                  variant='primary'
                  type='submit'
                  disabled={!dirty || editSettings.isPending}
                  busy={editSettings.isPending}
                >
                  Update settings
                </Button>
              </div>
              <p
                className={clsx(
                  styles.responseMessage,
                  responseMessage?.type === 'error' && styles.error,
                )}
              >
                {responseMessage?.text}
              </p>
            </div>
          </form>
        </ContentMaxWidthLayout>
      </ContentSidePaddingLayout>
    </>
  );
}
