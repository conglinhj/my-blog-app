import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagListComponent } from './tag-list/tag-list.component';



const routes: Routes = [
  {
    path: '',
    component: TagListComponent
  },
];

@NgModule({
  declarations: [TagListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TagModule { }
