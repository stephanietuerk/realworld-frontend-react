export type ApiErrorBody = {
  errors?: Record<string, string[]>;
  message?: string;
};

export type HttpError<T = unknown> = {
  kind: 'http';
  status: number;
  statusText: string;
  body?: T;
};

export type NetworkError = {
  kind: 'network';
  message: string;
};

export type AbortErr = {
  kind: 'aborted';
};

export type UnknownError = {
  kind: 'unknown';
  error: unknown;
};

export type ApiError<T = ApiErrorBody> =
  | HttpError<T>
  | NetworkError
  | AbortErr
  | UnknownError;

export type UiError = { message: string; fieldErrors?: Record<string, string> };
