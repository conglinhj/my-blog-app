import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }]),
    MatButtonModule,
  ]
})
export class HomePageModule { }
