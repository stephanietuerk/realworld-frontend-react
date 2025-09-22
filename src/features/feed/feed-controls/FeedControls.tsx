import type { ReactNode } from 'react';
import { useArticles } from '../../../api/useArticles';
import styles from './FeedControls.module.scss';
import TagOptions, { NONE_TAG } from './tag-options/TagOptions';

interface FeedControlsProps {
  tagsTitle: string;
  children: ReactNode;
}

const SHOW_TAGS_IF_NUM_ARTICLES = 2;

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
  const { articles, feedSelections, setFeedSelections } = useArticles();
  // does not include NONE_TAG
  const tagOptions = [...new Set(articles.flatMap((a) => a.tagList))];

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

  const showTags = articles.length > SHOW_TAGS_IF_NUM_ARTICLES;

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
