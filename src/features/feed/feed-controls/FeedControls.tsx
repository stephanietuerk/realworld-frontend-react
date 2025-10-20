import type { ReactNode } from 'react';
import { useFeed } from '../../../api/useFeed';
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
  const { allItems, feedSelections, setFeedSelections } = useFeed();
  // does not include NONE_TAG
  const tagOptions = !!allItems
    ? [...new Set(allItems.flatMap((a) => a.tagList))]
    : [];

  const toggleTag = (clickedTag: string) => {
    // Selections include NONE_TAG
    setFeedSelections((prev) => {
      const newTagSelections = getNewTagSelections(
        prev.tags,
        tagOptions,
        clickedTag,
      );
      return {
        ...prev,
        tags: newTagSelections,
      };
    });
  };

  const showTags = !allItems ? false : allItems.length > SHOW_TAGS_IF_NUM_ITEMS;

  return (
    <div className={styles.feedControls}>
      {children}
      {tagOptions && tagOptions.length > 1 && showTags && (
        <div>
          <p className={styles.tagsTitle}>{tagsTitle}</p>
          <TagOptions
            tags={tagOptions}
            selected={feedSelections.tags}
            toggleTag={toggleTag}
          ></TagOptions>
        </div>
      )}
    </div>
  );
}
