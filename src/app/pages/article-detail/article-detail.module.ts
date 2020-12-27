import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article-detail.component';



@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ArticleDetailComponent }]),
  ]
})
export class ArticleDetailModule { }
