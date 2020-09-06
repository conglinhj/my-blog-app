import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiError } from './../../classes/api-error';


@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }
    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: ApiError) => {
        const message = error.message || 'Unexpected error.';
        this.form.setErrors({ apiError: message });
      }
    });
  }

}
