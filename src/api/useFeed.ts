import { useContext } from 'react';
import { FeedContext } from '../context/FeedProvider';
import type { FeedContextType } from '../shared/types/feed.types';

export function useFeed(): FeedContextType {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error('useFeed must be used within FeedProvider');
  return ctx;
}
