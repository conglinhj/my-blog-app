import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagSelectionModule } from '../../components/tag-selection/tag-selection.module';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';


const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'create', component: ArticleFormComponent },
  { path: 'edit/:id', component: ArticleFormComponent },
];

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleFormComponent
  ],
  imports: [
    EditorModule,
    SharedModule,
    TagSelectionModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class ArticleModule { }
