import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, filter, first, map, switchMap } from 'rxjs/operators';
import { ApiError } from 'src/app/core/classes/api-error';
import { Article } from 'src/app/core/classes/article';
import { Tag } from 'src/app/core/classes/tag';
import { TINYMCE_EDITOR_CONFIGURATION } from 'src/app/core/constants';
import HttpStatusCode from 'src/app/core/enums/http-status-code.enum';
import { TagResourceService } from '../../tag/tag-resource.service';
import { ArticleResourceService } from '../article-resource.service';


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  form: FormGroup;
  article: Article;
  tags$: Observable<Tag[]>;
  editorConfig = TINYMCE_EDITOR_CONFIGURATION;

  constructor(
    private articleResourceService: ArticleResourceService,
    private tagResourceService: TagResourceService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.tags$ = this.tagResourceService.getList();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      content: new FormControl(''),
      tags: new FormControl([]),
    });

    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        switchMap(params => this.articleResourceService.get(params.id).pipe(first()))
      )
      .subscribe({
        next: article => {
          this.article = article;
          this.form.setValue(
            {
              title: article.title,
              description: article.description,
              content: article.content,
              tags: Array.isArray(article.tags) ? article.tags.map(tag => tag.id) : []
            },
            { emitEvent: false }
          );
        },
        error: (error: ApiError) => {
          if (error.httpErrorResponse.status === HttpStatusCode.NOT_FOUND) {
            this.snackBar.open('Article not found!', '', { verticalPosition: 'top' });
          } else {
            this.snackBar.open('Unexpected error!');
          }
          this.router.navigate(['management/articles']);
        }
      });
  }

  onSave(isPublished = false): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) { return; }

    const requestPayload = { ...this.form.getRawValue(), is_published: isPublished };

    const publish$ = this.article && this.article.id
      ? this.articleResourceService.update(this.article.id, requestPayload)
      : this.articleResourceService.create(requestPayload);

    publish$.pipe(first()).subscribe({
      next: (article) => {
        this.snackBar.open('Successful');
        this.article = article;
      },
      error: () => {
        this.snackBar.open('Failed');
      }
    });
  }

  onTagsChanged(tags: Tag[]): void {
    this.form.controls.tags.setValue(tags.map(tag => tag.id));
  }
}
