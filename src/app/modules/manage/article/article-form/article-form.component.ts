import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, first, mergeMap, tap } from 'rxjs/operators';
import { Article } from 'src/app/core/classes/article';
import { ArticleData } from 'src/app/core/interfaces/article-data';
import { ArticleDataService } from 'src/app/core/services/article-data.service';


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  form: FormGroup;
  formChanging: boolean;
  article: Article;

  constructor(
    private articleDataService: ArticleDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      content: new FormControl('')
    });

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          if (params.id) {
            return this.articleDataService.get(params.id).pipe(first());
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
            }, { emitEvent: false });
          }
        }
      });
  }

  onSave(isPublished = false): void {
    const publish$ = this.article && this.article.id
      ? this.articleDataService.update(this.article.id, { ...this.form.getRawValue(), is_published: isPublished })
      : this.articleDataService.create(this.form.getRawValue());

    publish$.pipe(first()).subscribe();
  }
}
