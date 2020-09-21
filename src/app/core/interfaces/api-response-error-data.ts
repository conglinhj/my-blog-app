export interface ApiFieldErrors {
  [key: string]: string[];
}

export interface ApiResponseErrorData {
  errors: ApiFieldErrors;
  message: string;
}
