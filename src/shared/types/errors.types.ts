export interface AppFieldError {
  field: string;
  message: string;
  code?: string;
}
export interface AppError {
  message: string;
  fieldErrors?: AppFieldError[];
  status?: number;
  dev?: { raw?: unknown; statusText?: string; serverMessage?: string };
}
