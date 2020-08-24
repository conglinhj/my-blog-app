import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentListComponent } from './comment-list/comment-list.component';


const routes: Routes = [
  {
    path: '',
    component: CommentListComponent
  },
];

@NgModule({
  declarations: [CommentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CommentModule { }
