import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Article } from 'src/app/core/classes/article';
import { ArticleDataService } from 'src/app/core/services/article-data.service';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  article$: Observable<Article>;

  constructor(
    private articleDataService: ArticleDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          if (!params.id) {
            return throwError('not found');
          }
          return of(params);
        })
      )
      .subscribe({
        next: ({ id }) => {
          this.article$ = this.articleDataService.get(id);
        },
        error: err => {
          // handle not found error
          // handle server error
        }
      });
  }
}
