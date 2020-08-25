import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;
  errorResponseMessages: string;

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
      error: res => {
        this.errorResponseMessages = res && res.message || 'Failed';
      }
    });
  }

}
