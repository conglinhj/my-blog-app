import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { CategoryCreateFormComponent } from './category-create-form/category-create-form.component';
import { CategoryEditFormComponent } from './category-edit-form/category-edit-form.component';
import { CategoryListComponent } from './category-list/category-list.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCreateFormComponent,
    CategoryEditFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CategoryListComponent },
      { path: 'create', component: CategoryCreateFormComponent },
      { path: 'edit/:id', component: CategoryEditFormComponent },
    ]),
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ]
})
export class CategoryModule { }
