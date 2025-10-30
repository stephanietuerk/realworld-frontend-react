import clsx from 'clsx';
import { DropdownMenu } from 'radix-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../api/useAuth';
import { useAuthenticatedUser } from '../../../api/useAuthenticatedUser';
import ChevronIcon from '../../../components/icons/ChevronIcon';
import { ROUTE } from '../../../shared/constants/routing';
import styles from './AccountMenu.module.scss';

export default function AccountMenu({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthenticatedUser();
  const { setToken } = useAuth();
  const navigateToProfile = () => {
    // Implement navigation to profile page
    navigate(ROUTE.profile(user?.username));
  };

  const navigateToSettings = () => {
    // Implement navigation to settings page
    navigate(ROUTE.settings);
  };

  const logout = () => {
    setToken(null);
  };

  const isProfilePage = location.pathname === ROUTE.profile(user?.username);
  const isSettingsPage = location.pathname === ROUTE.settings;
  const isAccountPage = isProfilePage || isSettingsPage;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className={clsx(
            styles.triggerButton,
            isAccountPage && styles.active,
            className,
          )}
        >
          Account
          <ChevronIcon
            size={16}
            className={clsx(styles.chevronIcon)}
          ></ChevronIcon>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.content}
          sideOffset={5}
          align='end'
        >
          <DropdownMenu.Item
            className={clsx(
              styles.menuItemContainer,
              isProfilePage && styles.active,
            )}
            onSelect={navigateToProfile}
          >
            <div className={styles.menuItem}>
              <p className={styles.itemLabel}>Profile</p>
              <p className={styles.itemContext}>
                Your articles, favorites, and user profile
              </p>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={clsx(
              styles.menuItemContainer,
              isSettingsPage && styles.active,
            )}
            onSelect={navigateToSettings}
          >
            <div className={styles.menuItem}>
              <p className={styles.itemLabel}>Settings</p>
              <p className={styles.itemContext}>Account name and password</p>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.menuItemContainer}
            onSelect={logout}
          >
            <div className={styles.menuItem}>
              <p className={styles.itemLabel}>Sign Out</p>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
