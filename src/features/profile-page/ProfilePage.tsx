import { useParams } from 'react-router';
import { useAuth } from '../../api/useAuth';
import { useAuthenticatedUser } from '../../api/useAuthenticatedUser';
import { useProfile } from '../../api/useProfile';
import Banner from '../../components/banner/Banner';
import FollowButton from '../../components/follow-button/FollowButton';
import Avatar from '../../components/icons/Avatar';
import {
  ArticleContentLayout,
  ContentMaxWidthLayout,
  ContentSidePaddingLayout,
  SidebarLayout,
} from '../../components/layout/Layout';
import { FeedProvider } from '../../context/FeedProvider';
import { FEED_OPTIONS } from '../../shared/constants/feed';
import { ROUTE } from '../../shared/constants/routing';
import type { FeedSelections } from '../../shared/types/feed.types';
import FeedWithLoadingOverlay from '../feed/FeedWithLoadingOverlay';
import FeedTypeOptions from '../feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls from '../feed/feed-controls/FeedControls';
import { NONE_TAG } from '../feed/feed-controls/tag-options/TagOptions';
import styles from './ProfilePage.module.scss';

const FEED_CONTROLS_DEFAULTS: FeedSelections = {
  feed: FEED_OPTIONS.profile[0]?.id || '',
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

  return (
    <>
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
                  fallbackClass={styles.avatarFallback}
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
                isFollowing={profile.following}
                className={styles.followButton}
                syncWithApi={refetch}
              ></FollowButton>
            )}
          </div>
        )}
      </Banner>
      <ContentSidePaddingLayout>
        <FeedProvider feedControlsDefaults={FEED_CONTROLS_DEFAULTS}>
          <ContentMaxWidthLayout>
            <SidebarLayout>
              <FeedControls tagsTitle='Show articles about'>
                <div>
                  <p className={styles.feedTypeTitle}>
                    {isLoggedInUser ? 'Show my' : "Show this user's"}
                  </p>
                  <FeedTypeOptions
                    options={FEED_OPTIONS.profile}
                  ></FeedTypeOptions>
                </div>
              </FeedControls>
            </SidebarLayout>
            <ArticleContentLayout>
              <FeedWithLoadingOverlay options={FEED_OPTIONS.profile} />
            </ArticleContentLayout>
          </ContentMaxWidthLayout>
        </FeedProvider>
      </ContentSidePaddingLayout>
    </>
  );
}
