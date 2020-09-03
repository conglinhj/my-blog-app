import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
