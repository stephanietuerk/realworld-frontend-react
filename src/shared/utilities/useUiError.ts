import { useMemo } from 'react';
import type { ApiError } from '../types/errors.types';
import { normalizeError } from './errors';

export function useUiError(error: ApiError | null) {
  return useMemo(() => (error ? normalizeError(error) : null), [error]);
}
