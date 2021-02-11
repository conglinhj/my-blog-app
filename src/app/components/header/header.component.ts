import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/core/classes/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  authenticate$: Observable<User>;

  constructor(private auth: AuthService) {
    this.authenticate$ = this.auth.userSubject$;
  }

  onLogout(): void {
    this.auth.logout()
      .pipe(take(1))
      .subscribe({
        next: () => {
          window.location.replace('/');
        }
      });
  }
}
