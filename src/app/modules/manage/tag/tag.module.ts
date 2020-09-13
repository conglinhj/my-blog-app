import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../../../shared/shared.module';
import { TagCreateFormComponent } from './tag-create-form/tag-create-form.component';
import { TagEditFormComponent } from './tag-edit-form/tag-edit-form.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { tagFeature } from './tag.reducer';


const routes: Routes = [
  { path: '', component: TagListComponent },
  { path: 'create', component: TagCreateFormComponent },
  { path: 'edit/:id', component: TagEditFormComponent },
];

@NgModule({
  declarations: [
    TagListComponent,
    TagCreateFormComponent,
    TagEditFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(tagFeature.stateKey, tagFeature.reducer),
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ]
})
export class TagModule { }
