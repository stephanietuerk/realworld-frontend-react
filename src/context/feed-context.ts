import { createContext } from 'react';
import type { FeedContextType } from '../shared/types/feed.types';

export const FeedContext = createContext<FeedContextType | undefined>(
  undefined,
);
