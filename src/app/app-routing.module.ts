import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
  },
    {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [AuthGuard],
    data: { isAuthenticating: true }
  },
  {
    path: 'login',
    redirectTo: 'auth/login'
  },
  {
    path: 'register',
    redirectTo: 'auth/register'
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./not-found-page/not-found-page.module').then(m => m.NotFoundPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
