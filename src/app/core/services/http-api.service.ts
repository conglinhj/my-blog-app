import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, options?: object): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, postData: any | null, options?: object): Observable<T> {
    return this.http.post<T>(url, postData, options);
  }

  put<T>(url: string, putData: any | null, options?: object): Observable<T> {
    return this.http.put<T>(url, putData, options);
  }

  patch<T>(url: string, patchData: any | null, options?: object): Observable<T> {
    return this.http.patch<T>(url, patchData, options);
  }

  delete<T>(url: string, options?: object): Observable<T> {
    return this.http.delete<T>(url, options);
  }

}
