import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'auth/login' },
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent }
    ])
  ]
})
export class AuthenticationModule { }
