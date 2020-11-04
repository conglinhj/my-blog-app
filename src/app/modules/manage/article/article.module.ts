import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { ArticleListComponent } from './article-list/article-list.component';


const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'create', component: ArticleFormComponent },
  { path: ':id', component: ArticleDetailsComponent }
];

@NgModule({
  declarations: [
    ArticleDetailsComponent,
    ArticleListComponent,
    ArticleListItemComponent,
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticleModule { }
