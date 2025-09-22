import { useAuth } from '../../api/useAuth';
import Banner from '../../components/banner/Banner';
import BodyLayout from '../../components/body-layout/BodyLayout';
import MainLayout from '../../components/main-layout/MainLayout';
import SidebarLayout from '../../components/sidebar-layout/SidebarLayout';
import { ArticlesProvider } from '../../context/ArticlesProvider';
import { APP_NAME } from '../../shared/constants/app';
import type {
  FeedOption,
  FeedSelections,
} from '../../shared/types/articles.types';
import Feed from '../feed/Feed';
import FeedTypeOptions from '../feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls from '../feed/feed-controls/FeedControls';
import { NONE_TAG } from '../feed/feed-controls/tag-options/TagOptions';
import styles from './HomePage.module.scss';

export const HOME_FEED_OPTIONS: FeedOption[] = [
  {
    display: 'Conduit community',
    id: 'community',
    noArticlesString: () =>
      "It looks like the Conduit community may be on a writers' strike. There are no articles to show.",
  },
  {
    display: 'Accounts I follow',
    id: 'following',
    noArticlesString: () =>
      'Hmmm. It looks like you may not have followed any accounts yet.',
  },
];

const FEED_CONTROLS_DEFAULTS: FeedSelections = {
  feed: 'community',
  tags: [NONE_TAG],
};

export default function HomePage() {
  const { isLoggedIn } = useAuth();

  return (
    <MainLayout>
      <Banner
        outerContainerClassName={styles.bannerOuter}
        contentClassName={styles.bannerContent}
      >
        <p className={styles.name}>{APP_NAME}</p>
        <p className={styles.description}>A place to share your knowledge</p>
      </Banner>
      <ArticlesProvider feedControlsDefaults={FEED_CONTROLS_DEFAULTS}>
        <BodyLayout>
          <SidebarLayout>
            <FeedControls tagsTitle='Show articles about'>
              {isLoggedIn && (
                <div>
                  <p className={styles.feedTypeTitle}>Show articles from</p>
                  <FeedTypeOptions
                    options={HOME_FEED_OPTIONS}
                  ></FeedTypeOptions>
                </div>
              )}
            </FeedControls>{' '}
          </SidebarLayout>
          <Feed options={HOME_FEED_OPTIONS}></Feed>
        </BodyLayout>
      </ArticlesProvider>
    </MainLayout>
  );
}
