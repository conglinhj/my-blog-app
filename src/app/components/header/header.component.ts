import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  user: User;
  isAuthenticated: boolean;

  constructor(
    private auth: AuthService,
    // private router: Router
  ) {
    this.auth.userSubject$.subscribe(user => {
      this.user = user;
      this.isAuthenticated = this.auth.isAuthenticated;
    });
  }

  onLogout(): void {
    this.auth.logout().subscribe(() => {
      location.reload();
    });
  }

  ngOnDestroy(): void {
    this.auth.userSubject$.unsubscribe();
  }
}
