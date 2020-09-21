import { Component, OnDestroy } from '@angular/core';
import { User } from 'src/app/core/classes/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  user: User;
  isAuthenticated: boolean;

  constructor(private auth: AuthService) {
    this.auth.userSubject$.subscribe(user => {
      this.user = user;
      this.isAuthenticated = this.auth.isAuthenticated;
    });
  }

  onLogout(): void {
    this.auth.logout().subscribe(() => {
      location.reload(); // TODO: should be smarter
    });
  }

  ngOnDestroy(): void {
    this.auth.userSubject$.unsubscribe();
  }
}
