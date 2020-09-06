import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthResponseData } from '../interfaces/auth-response-data';
import { LoginRequestData } from '../interfaces/login-request-data';
import { RegisterRequestData } from '../interfaces/register-request-data';
import { UserData } from './../interfaces/user-data';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN_KEY = 'm_id';
  private readonly USER_KEY = 'm_user';

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

  get user(): UserData {
    return JSON.parse(window.localStorage.getItem(this.USER_KEY));
  }

  set user(value: UserData) {
    if (value) {
      window.localStorage.setItem(this.USER_KEY, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(this.USER_KEY);
    }
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  private isAuthResponseData(res: AuthResponseData): boolean {
    return !!(res && res.access_token && res.data);
  }

  login(data: LoginRequestData): Observable<any> {
    return this.http.post<AuthResponseData>('login', data).pipe(
      mergeMap(res => {
        if (this.isAuthResponseData(res)) {
          this.token = res.access_token;
          this.user = res.data;
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
        this.user = null;
        return of(true);
      }),
      catchError(() => of(false))
    );
  }

  register(data: RegisterRequestData): Observable<boolean> {
    return this.http.post<AuthResponseData>('register', data).pipe(
      mergeMap(res => {
        if (this.isAuthResponseData(res)) {
          this.token = res.access_token;
          this.user = res.data;
          return of(true);
        }
        return throwError(false);
      })
    );
  }

}
