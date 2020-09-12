import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';


@NgModule({
  declarations: [
    ManageComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    ManageRoutingModule
  ],
  exports: [RouterModule]
})
export class ManageModule { }
