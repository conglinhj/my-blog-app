import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { ArticleListComponent } from './article-list/article-list.component';


const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: ':id', component: ArticleDetailsComponent }
];

@NgModule({
  declarations: [
    ArticleDetailsComponent,
    ArticleListComponent,
    ArticleListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticleModule { }
