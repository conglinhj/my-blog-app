import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private http: HttpClient) { }

  formatApiUrl(url: string): string {
    if (url[0] === 'http' || url[0] ===  'https') {
      return url;
    }
    return environment.apiEndpoint + url[0] === '/' ? url : `/${url}`;
  }

  get<T>(url: string, options?: object): Observable<T> {
    return this.http.get<T>(this.formatApiUrl(url), options);
  }

  post<T>(url: string, postData: any | null, options?: object): Observable<T> {
    return this.http.post<T>(this.formatApiUrl(url), postData, options);
  }

  put<T>(url: string, putData: any | null, options?: object): Observable<T> {
    return this.http.put<T>(this.formatApiUrl(url), putData, options);
  }

  patch<T>(url: string, patchData: any | null, options?: object): Observable<T> {
    return this.http.patch<T>(this.formatApiUrl(url), patchData, options);
  }

  delete<T>(url: string, options?: object): Observable<T> {
    return this.http.delete<T>(this.formatApiUrl(url), options);
  }

}
