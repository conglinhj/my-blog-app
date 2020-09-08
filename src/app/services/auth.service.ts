import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthResponseData } from '../interfaces/auth-response-data';
import { LoginRequestData } from '../interfaces/login-request-data';
import { RegisterRequestData } from '../interfaces/register-request-data';
import { User } from './../classes/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN_KEY = 'm_id';
  private readonly USER_KEY = 'm_user';
  userSubject$: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.userSubject$ = new BehaviorSubject(new User(JSON.parse(localStorage.getItem(this.USER_KEY))));
  }

  get token(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  set token(value: string) {
    if (value) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, value);
    } else {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
  }

  get user(): User {
    return this.userSubject$.value;
  }

  set user(user: User) {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user.data));
      this.userSubject$.next(user);
    } else {
      localStorage.removeItem(this.USER_KEY);
      this.userSubject$.next(null);
    }
  }

  get isAuthenticated(): boolean {
    return !!(this.token && this.user);
  }

  private isAuthResponseData(res: AuthResponseData): boolean {
    return !!(res && res.access_token && res.data);
  }

  removeCredentials(): void {
    this.token = null;
    this.user = null;
  }

  login(data: LoginRequestData): Observable<User> {
    return this.http.post<AuthResponseData>('login', data).pipe(
      mergeMap(res => {
        if (this.isAuthResponseData(res)) {
          this.token = res.access_token;
          this.user = new User(res.data);
          return of(this.user);
        }
        return throwError(false);
      })
    );
  }

  register(data: RegisterRequestData): Observable<User> {
    return this.http.post<AuthResponseData>('register', data).pipe(
      mergeMap(res => {
        if (this.isAuthResponseData(res)) {
          this.token = res.access_token;
          this.user = new User(res.data);
          return of(this.user);
        }
        return throwError(false);
      })
    );
  }

  verifyAccess(): Observable<boolean> {
    return this.http.post<AuthResponseData>('verify_access', null).pipe(
      mergeMap(res => of(!!res)),
      catchError(() => of(false))
    );
  }

  logout(): Observable<boolean> {
    return this.http.post('logout', null).pipe(
      mergeMap(() => {
        this.removeCredentials();
        return of(true);
      }),
      catchError(() => of(false))
    );
  }

}
