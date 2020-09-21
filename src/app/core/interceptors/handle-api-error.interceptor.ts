import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError } from './../classes/api-error';

@Injectable()
export class HandleApiErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      return throwError(new ApiError(error));
    }
    console.error('Unknown error: ', error);
    return throwError(error);
  }
}
