import type { AppError, AppFieldError } from '../types/errors.types';

export async function parseErrorBody(
  res: Response,
): Promise<unknown | undefined> {
  // Response can be read once; we don't rethrow the same response object elsewhere
  const text = await res.text().catch(() => '');
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text.slice(0, 2000) };
  }
}

export function normalizeToAppError(e: unknown): AppError {
  // Network/Abort
  if (e instanceof DOMException && e.name === 'AbortError') {
    return { message: 'Request was canceled.', dev: { raw: e } };
  }
  if (e instanceof TypeError) {
    // fetch() network failures in browsers often surface as TypeError
    return {
      message: 'Network error — check your connection and try again.',
      dev: { raw: e },
    };
  }
  // Our HTTP wrapper path
  const any = e as any;
  if (any && typeof any === 'object' && typeof any.status === 'number') {
    const status: number = any.status;
    const body = any.body ?? {};
    const serverMessage: string | undefined = body?.message;

    // RealWorld shape: { errors: { field: string[] } }
    const fieldBag = (body?.errors ?? {}) as Record<string, string[] | string>;
    const entries = Object.entries(fieldBag);

    const globalMsgs = Array.isArray((fieldBag as any).body)
      ? ((fieldBag as any).body as string[])
      : [];

    const fieldErrors =
      entries
        .filter(([k]) => k !== 'body')
        .flatMap(([field, msgs]) => {
          const messages = Array.isArray(msgs) ? msgs : [msgs];
          const normalizedField = field.toLowerCase().trim();

          if (normalizedField === 'email or password') {
            globalMsgs.push('Invalid email or password.');
            return []; // Handled as global message
          }

          return messages.map(
            (m) =>
              ({
                field,
                message: sentenceCase(
                  `${humanizeField(field)} ${cleanServerPhrase(m)}`,
                ),
              }) as AppFieldError,
          );
        }) || undefined;

    const fallbackByStatus: Record<number, string> = {
      400: 'There’s a problem with what you submitted.',
      401: 'Invalid email or password.',
      403: 'You don’t have permission to do that.',
      404: 'We couldn’t find what you were looking for.',
      409: 'That conflicts with something already on the server.',
      422: 'Please fix the errors below.',
      429: 'Too many requests — please wait a moment.',
      500: 'Something went wrong on our end.',
      503: 'Service is temporarily unavailable — please try again.',
    };

    const message =
      (status === 401 ? 'Invalid email or password.' : undefined) ||
      (globalMsgs[0]?.trim() && sentenceCase(globalMsgs[0])) ||
      serverMessage?.trim() ||
      fallbackByStatus[status] ||
      'Something went wrong. Please try again.';

    return {
      message,
      fieldErrors: fieldErrors?.length ? fieldErrors : undefined,
      status,
      dev: { raw: e, statusText: any.statusText, serverMessage },
    };
  }

  // Unknown fallthrough
  return {
    message: 'Something went wrong. Please try again.',
    dev: { raw: e },
  };
}

function humanizeField(key: string): string {
  return key
    .replace(/\./g, ' ')
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .trim();
}
function sentenceCase(s: string): string {
  const t = s?.toString().trim().replace(/\.+$/, '');
  return t ? t.charAt(0).toUpperCase() + t.slice(1) + '.' : '';
}
function cleanServerPhrase(msg: string): string {
  const m = msg?.toString().trim();
  if (!m) return 'is invalid';
  const table: Record<string, string> = {
    "can't be blank": 'is required',
    'can not be blank': 'is required',
    'is invalid': 'is invalid',
    'is too short': 'is too short',
    'has already been taken': 'already exists',
    'is not a valid email': 'must be a valid email',
  };
  const key = m.toLowerCase();
  return table[key] ?? m;
}
