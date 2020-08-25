import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HandleErrorInterceptor } from './handle-error.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { RequestUrlInterceptor } from './request-url.interceptor';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RequestUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
