import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useFeed } from '../../../api/useFeed';
import { useTags } from '../../../api/useTags';
import styles from './FeedControls.module.scss';
import TagOptions, { NONE_TAG } from './tag-options/TagOptions';

interface FeedControlsProps {
  tagsTitle: string;
  children: ReactNode;
}

const SHOW_TAGS_IF_NUM_ITEMS = 2;

function getNewTagSelections(
  prevTags: string[],
  tagOptions: string[],
  clickedTag: string,
): string[] {
  let newTagSelections: string[];
  let prevTagSelections = prevTags.filter((x) => x !== NONE_TAG);
  if (!tagOptions.length) {
    newTagSelections = [];
  } else if (clickedTag === NONE_TAG || !tagOptions.includes(clickedTag)) {
    newTagSelections = [NONE_TAG];
  } else {
    newTagSelections =
      prevTagSelections.includes(clickedTag) && tagOptions.includes(clickedTag)
        ? prevTagSelections.filter((t) => t !== clickedTag)
        : [...prevTagSelections, clickedTag];
  }
  return newTagSelections;
}

export default function FeedControls({
  tagsTitle,
  children,
}: FeedControlsProps) {
  const { feedSelections, setFeedSelections, setPage, totalCount } = useFeed();
  const { username: profileUsername } = useParams<{ username: string }>();
  const { tags, isPending } = useTags({ limit: 20, username: profileUsername });

  const toggleTag = (clickedTag: string) => {
    setPage(1);
    // Selections include NONE_TAG
    setFeedSelections((prev) => {
      const newTagSelections = getNewTagSelections(
        prev.tags,
        tags || [],
        clickedTag,
      );
      return {
        ...prev,
        tags: newTagSelections.length > 0 ? newTagSelections : [NONE_TAG],
      };
    });
  };

  const showTags = !profileUsername
    ? true
    : !!tags && totalCount > SHOW_TAGS_IF_NUM_ITEMS;

  return (
    <div className={styles.feedControls}>
      {children}
      {showTags && (
        <div>
          <p className={styles.tagsTitle}>{tagsTitle}</p>
          <TagOptions
            tags={tags}
            selected={feedSelections.tags}
            toggleTag={toggleTag}
            isLoading={isPending}
          ></TagOptions>
        </div>
      )}
    </div>
  );
}
