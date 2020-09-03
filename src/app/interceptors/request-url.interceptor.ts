import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestUrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      url: this.formatApiUrl(request.url)
    });
    return next.handle(request);
  }

  private formatApiUrl(url: string): string {
    if (url[0] === 'http' || url[0] === 'https') {
      return url;
    }
    return `${environment.apiEndpoint}/${url}`;
  }
}
