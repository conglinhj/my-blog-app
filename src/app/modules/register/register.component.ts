import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequestData } from '../../interfaces/register-request-data';

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
      error: res => {
        console.log(res);
      }
    });
  }

}
