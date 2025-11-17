import { useState } from 'react';
import { useAuth } from '../../api/useAuth';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import MainLayout from '../../components/main-layout/MainLayout';
import SidebarLayout from '../../components/sidebar-layout/SidebarLayout';
import { FeedProvider } from '../../context/FeedProvider';
import { APP_NAME } from '../../shared/constants/app';
import { FEED_OPTIONS } from '../../shared/constants/feed';
import type { FeedSelections } from '../../shared/types/feed.types';
import Feed from '../feed/Feed';
import FeedTypeOptions from '../feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls from '../feed/feed-controls/FeedControls';
import { NONE_TAG } from '../feed/feed-controls/tag-options/TagOptions';
import { useDelayedLoading } from '../feed/useDelayedLoading';
import styles from './HomePage.module.scss';

const FEED_CONTROLS_DEFAULTS: FeedSelections = {
  feed: FEED_OPTIONS.home[0]?.id!,
  tags: [NONE_TAG],
};

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const showSpinner = useDelayedLoading(isLoading, 500);

  return (
    <MainLayout>
      <div className={styles.heightContainer}>
        <Banner
          outerContainerClassName={styles.bannerOuter}
          contentClassName={styles.bannerContent}
        >
          <p className={styles.name}>{APP_NAME}</p>
          <p className={styles.description}>A place to share your knowledge</p>
        </Banner>
        <FeedProvider feedControlsDefaults={FEED_CONTROLS_DEFAULTS}>
          <BodyLayout showLoadingSpinner={showSpinner}>
            <SidebarLayout>
              <FeedControls tagsTitle='Show articles about'>
                {isLoggedIn && (
                  <div>
                    <p className={styles.feedTypeTitle}>Show articles from</p>
                    <FeedTypeOptions
                      options={FEED_OPTIONS.home}
                    ></FeedTypeOptions>
                  </div>
                )}
              </FeedControls>{' '}
            </SidebarLayout>
            <Feed options={FEED_OPTIONS.home} setIsLoading={setIsLoading} />
          </BodyLayout>
        </FeedProvider>
      </div>
    </MainLayout>
  );
}
