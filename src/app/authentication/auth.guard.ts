import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot): boolean | UrlTree {
    if (next.data.isAuthenticating === true) {
      return !this.auth.isAuthenticated;
    }
    return this.auth.isAuthenticated || this.router.parseUrl('/login');
  }
}
