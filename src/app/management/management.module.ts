import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
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
    SharedModule,
    ManageRoutingModule
  ],
  exports: [RouterModule]
})
export class ManagementModule { }
