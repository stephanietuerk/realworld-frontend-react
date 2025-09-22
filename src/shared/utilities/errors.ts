import type {
  HttpError,
  AbortErr,
  ApiError,
  UiError,
  ApiErrorBody,
} from '../types/errors.types';

export const isHttpError = <T = unknown>(e: unknown): e is HttpError<T> =>
  !!e && typeof e === 'object' && (e as any).kind === 'http';

export const isAbortErr = (e: unknown): e is AbortErr =>
  !!e && typeof e === 'object' && (e as any).kind === 'aborted';

export function normalizeError(e: ApiError): UiError {
  if (e.kind === 'aborted') return { message: 'Request was canceled.' };
  if (e.kind === 'network') return { message: e.message || 'Network error.' };
  if (e.kind === 'http') {
    const fieldErrors = e.body && (e.body as ApiErrorBody).errors;
    if (fieldErrors) {
      const flat = Object.fromEntries(
        Object.entries(fieldErrors).map(([k, v]) => [k, v.join(', ')]),
      );
      return { message: 'Please fix the errors below.', fieldErrors: flat };
    }
    const generic = (e.body as ApiErrorBody)?.message;
    return { message: generic ?? `${e.status} ${e.statusText}` };
  }
  return { message: 'Something went wrong.' };
}
