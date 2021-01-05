import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { Article } from 'src/app/core/classes/article';
import { Tag } from 'src/app/core/classes/tag';
import { TINYMCE_EDITOR_CONFIGURATION } from 'src/app/core/constants';
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
  tags: Tag[] = [];
  editorConfig = TINYMCE_EDITOR_CONFIGURATION;

  constructor(
    private articleResourceService: ArticleResourceService,
    private tagResourceService: TagResourceService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      content: new FormControl(''),
      tags: new FormControl([]),
    });

    this.tagResourceService.getList()
      .pipe(first())
      .subscribe(tags => {
        this.tags = tags;
      });

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          if (params.id) {
            return this.articleResourceService.get(params.id).pipe(first());
          }
          return of(null);
        })
      )
      .subscribe({
        next: article => {
          if (article) {
            this.article = article;
            this.form.setValue({
              title: article.title,
              description: article.description,
              content: article.content,
              tags: Array.isArray(article.tags) ? article.tags.map(tag => tag.id) : []
            }, { emitEvent: false });
          }
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
      next: () => {
        this.snackBar.open('Successful');
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
