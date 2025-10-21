import type { ApiError, ApiErrorBody, UiError } from '../types/errors.types';

export function toUiError(err: ApiError): UiError {
  if (err.kind === 'network')
    return { message: err.message || 'Network error' };
  if (err.kind === 'aborted') return { message: 'Request cancelled' };
  if (err.kind === 'unknown') return { message: 'Unexpected error' };

  const body = err.body;
  const asObj: ApiErrorBody | undefined =
    typeof body === 'string' ? { message: body } : body;

  const fieldErrors = asObj?.errors
    ? Object.fromEntries(
        Object.entries(asObj.errors).map(([k, v]) => [
          k,
          Array.isArray(v) ? v.join(', ') : String(v),
        ]),
      )
    : undefined;

  // Distinguish common cases
  if (err.status === 401) return { message: 'Invalid email or password.' };
  if (err.status === 404) return { message: 'Service not found (404).' };
  if (err.status === 422) {
    const msg = fieldErrors
      ? Object.values(fieldErrors).join(', ')
      : asObj?.message || 'Validation error';
    return { message: msg, fieldErrors };
  }

  return { message: asObj?.message || `Request failed (${err.status})` };
}
