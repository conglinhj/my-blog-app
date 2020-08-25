import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { LoginRequestData } from '../core/interfaces/login-request-data';
import { RegisterRequestData } from '../core/interfaces/register-request-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN_KEY = 'm_id';

  constructor(private http: HttpClient) { }

  get token(): string {
    return window.localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  set token(value: string) {
    if (value) {
      window.localStorage.setItem(this.ACCESS_TOKEN_KEY, value);
    } else {
      window.localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  login(data: LoginRequestData): Observable<any> {
    return this.http.post('login', data).pipe(
      mergeMap((res: any) => {
        if (res && res.access_token) {
          this.token = res.access_token;
          return of(true);
        }
        return throwError(false);
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post('logout', null).pipe(
      mergeMap(() => {
        this.token = null;
        return of(true);
      }),
      catchError(() => of(false))
    );
  }

  register(data: RegisterRequestData): Observable<any> {
    return this.http.post('register', data).pipe(
      mergeMap((res: any) => {
        if (res && res.access_token) {
          this.token = res.access_token;
          return of(res.data);
        }
        return throwError(false);
      })
    );
  }

}
