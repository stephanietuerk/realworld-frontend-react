import { useAuth } from '../../api/useAuth';
import Banner from '../../components/banner/Banner';
import {
  ArticleContentLayout,
  ContentMaxWidthLayout,
  ContentSidePaddingLayout,
  SidebarLayout,
} from '../../components/layout/Layout';
import { FeedProvider } from '../../context/FeedProvider';
import { APP_NAME } from '../../shared/constants/app';
import { FEED_OPTIONS } from '../../shared/constants/feed';
import type { FeedSelections } from '../../shared/types/feed.types';
import { useModalAwareLoading } from '../about-modal/useModalAwareLoading';
import Feed from '../feed/Feed';
import FeedTypeOptions from '../feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls from '../feed/feed-controls/FeedControls';
import { NONE_TAG } from '../feed/feed-controls/tag-options/TagOptions';
import styles from './HomePage.module.scss';

const FEED_CONTROLS_DEFAULTS: FeedSelections = {
  feed: FEED_OPTIONS.home[0]?.id!,
  tags: [NONE_TAG],
};

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const { setIsLoading, showSpinner } = useModalAwareLoading();

  return (
    <ContentSidePaddingLayout>
      <Banner
        outerContainerClassName={styles.bannerOuter}
        contentClassName={styles.bannerContent}
      >
        <p className={styles.name}>{APP_NAME}</p>
        <p className={styles.description}>A place to share your knowledge</p>
      </Banner>
      <FeedProvider feedControlsDefaults={FEED_CONTROLS_DEFAULTS}>
        <ContentMaxWidthLayout showLoadingSpinner={showSpinner}>
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
          <ArticleContentLayout>
            <Feed options={FEED_OPTIONS.home} setIsLoading={setIsLoading} />
          </ArticleContentLayout>
        </ContentMaxWidthLayout>
      </FeedProvider>
    </ContentSidePaddingLayout>
  );
}
