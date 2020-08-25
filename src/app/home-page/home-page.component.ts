import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private auth: AuthService) {
    this.isAuthenticated = this.auth.isAuthenticated;
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.auth.logout()
      .pipe(
        finalize(() => {
          this.isAuthenticated = this.auth.isAuthenticated;
        })
      )
      .subscribe();
  }
}
