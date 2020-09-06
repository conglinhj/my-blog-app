import { HttpErrorResponse } from '@angular/common/http';
import { ApiFieldErrors, ApiResponseErrorData } from '../interfaces/api-response-error-data';


export class ApiError {

  private readonly error: ApiResponseErrorData;

  constructor(public httpErrorResponse: HttpErrorResponse) {
    this.error = this.httpErrorResponse.error || { errors: {} };
  }

  get message(): string {
    return this.error.message;
  }

  get errors(): ApiFieldErrors {
    return this.error.errors;
  }

  getFieldErrors(fieldName: string): string[] | undefined {
    return this.errors[fieldName];
  }
}
