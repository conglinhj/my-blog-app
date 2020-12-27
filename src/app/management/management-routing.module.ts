import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';


const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'articles', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) },
      { path: 'categories', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
      { path: 'tags', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule) },
      { path: 'comments', loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
