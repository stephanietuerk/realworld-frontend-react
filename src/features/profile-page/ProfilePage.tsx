import { useParams } from 'react-router';
import { useProfile } from '../../api/useProfile';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import FollowButton from '../../components/follow-button/FollowButton';
import Avatar from '../../components/icons/Avatar';
import MainLayout from '../../components/main-layout/MainLayout';
import SidebarLayout from '../../components/sidebar-layout/SidebarLayout';
import { ArticlesProvider } from '../../context/ArticlesProvider';
import { ROUTE } from '../../shared/constants/routing';
import type {
  FeedOption,
  FeedSelections,
} from '../../shared/types/articles.types';
import Feed from '../feed/Feed';
import FeedTypeOptions from '../feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls from '../feed/feed-controls/FeedControls';
import { NONE_TAG } from '../feed/feed-controls/tag-options/TagOptions';
import styles from './ProfilePage.module.scss';
import { ErrorBoundary } from '../../shared/utilities/error-boundary';
import { useAuth } from '../../api/useAuth';

export const PROFILE_FEED_OPTIONS: FeedOption[] = [
  {
    display: 'Own articles',
    id: 'author',
    noArticlesString: (username = 'this user') =>
      `It looks like ${username} may not have written anything yet. There are no articles to show.`,
  },
  {
    display: 'Favorites',
    id: 'favorited',
    noArticlesString: (username = 'this user') =>
      `Hmmm. It looks like ${username} may not have favorited anything yet.`,
  },
];

const FEED_CONTROLS_DEFAULTS: FeedSelections = {
  feed: 'author',
  tags: [NONE_TAG],
};

const BREADCRUMBS: (
  username?: string,
) => { display: string; route: string }[] = (username) => [
  { display: 'Explore', route: ROUTE.explore },
  {
    display: 'User profile',
    route: ROUTE.profile(username),
  },
];

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();
  const { username } = useParams();
  const { user: loggedInUser } = useAuthenticatedUser();
  const { profile, error, refetch } = useProfile(username);

  const isLoggedInUser = isLoggedIn && username === loggedInUser?.username;
  const showFollowUserButton =
    isLoggedIn && username !== loggedInUser?.username;

  if (error) {
    console.log(error);
    return <div>Could not load profile.</div>;
  }

  if (!profile) {
    return <div>User not found.</div>;
  }

  return (
    <ErrorBoundary
      fallback={<p>Oops, error</p>}
      onError={(error, info) => console.log(error, info)}
    >
      <Banner
        outerContainerClassName={styles.bannerOuter}
        surface='dark'
        breadcrumbs={BREADCRUMBS(profile?.username)}
      >
        {profile && (
          <div className={styles.bannerUserProfile}>
            <div className={styles.bannerUserContainer}>
              <div className={styles.userNameContainer}>
                <Avatar
                  imgClass={styles.avatar}
                  src={profile.image}
                  alt={`avatar for ${profile.username}`}
                  size={40}
                ></Avatar>
                <p className={styles.bannerUserName}>{profile.username}</p>
              </div>
              <p className={styles.bannerUserBio}>{profile.bio}</p>
            </div>
            {showFollowUserButton && (
              <FollowButton
                profile={profile}
                className={styles.followButton}
                syncWithApi={refetch}
              ></FollowButton>
            )}
          </div>
        )}
      </Banner>
      <MainLayout>
        <ArticlesProvider feedControlsDefaults={FEED_CONTROLS_DEFAULTS}>
          <BodyLayout>
            <SidebarLayout>
              <FeedControls tagsTitle='Show articles about'>
                <div>
                  <p className={styles.feedTypeTitle}>
                    {isLoggedInUser ? 'Show my' : "Show this user's"}
                  </p>
                  <FeedTypeOptions
                    options={PROFILE_FEED_OPTIONS}
                  ></FeedTypeOptions>
                </div>
              </FeedControls>
            </SidebarLayout>
            <Feed options={PROFILE_FEED_OPTIONS}></Feed>
          </BodyLayout>
        </ArticlesProvider>
      </MainLayout>
    </ErrorBoundary>
  );
}
