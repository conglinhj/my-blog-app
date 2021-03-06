import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/core/classes/api-error';
import { RegisterRequestData } from 'src/app/core/interfaces/register-request-data';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required])
    });

    this.form.controls.confirmPassword.valueChanges
      .subscribe(value => {
        if (value && value !== this.form.controls.password.value) {
          this.form.controls.confirmPassword.setErrors({ notMatch: true });
        } else {
          this.form.controls.confirmPassword.setErrors(null);
        }
      });
  }

  onSubmit(): void {
    this.form.updateValueAndValidity();
    if (this.form.invalid) { return; }

    const data: RegisterRequestData = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: ApiError) => {
        const message = error.message || 'Unexpected error.';
        if (error.getFieldErrors('name')) {
          this.form.controls.name.setErrors({ apiError: error.getFieldErrors('name')[0] });
        }
        if (error.getFieldErrors('email')) {
          this.form.controls.email.setErrors({ apiError: error.getFieldErrors('email')[0] });
        }
        this.form.setErrors({ apiError: message });
      }
    });
  }

}
