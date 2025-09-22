import clsx from 'clsx';
import styles from './AccountMenu.module.scss';
import ChevronIcon from '../../../components/icons/ChevronIcon';
import { DropdownMenu } from 'radix-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthenticatedUser } from '../../../api/useAuthenticatedUser';
import { ROUTE } from '../../../shared/constants/routing';

export default function AccountMenu({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthenticatedUser();
  const navigateToProfile = () => {
    // Implement navigation to profile page
    navigate(ROUTE.profile(user?.username));
  };

  const navigateToSettings = () => {
    // Implement navigation to settings page
    navigate(ROUTE.settings);
  };

  const logout = () => {
    // Implement logout functionality
    // E.g., clear user session, redirect to login page, etc.
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
            className={clsx(styles.menuItem, isProfilePage && styles.active)}
            onSelect={navigateToProfile}
          >
            <p className={styles.itemLabel}>Profile</p>
            <p className={styles.itemContext}>
              Your articles, favorites, and user profile
            </p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={clsx(styles.menuItem, isSettingsPage && styles.active)}
            onSelect={navigateToSettings}
          >
            <p className={styles.itemLabel}>Settings</p>
            <p className={styles.itemContext}>Account name and password</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.menuItem} onSelect={logout}>
            <p className={styles.itemLabel}>Sign Out</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
