import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ManageRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';


@NgModule({
  declarations: [
    ManagementComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    ManageRoutingModule
  ],
  exports: [RouterModule]
})
export class ManagementModule { }
