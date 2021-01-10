import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { Article } from 'src/app/core/classes/article';
import { Tag } from 'src/app/core/classes/tag';
import { ArticleDataService } from 'src/app/core/services/article-data.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles$: Observable<Article[]> = from([]);
  isLoading = true;
  trackByArticleId = (_index: number, article: Article): number => article.id;
  trackByTagId = (_index: number, tag: Tag): number => tag.id;

  constructor(
    private articleDataService: ArticleDataService
  ) {
    this.articles$ = this.articleDataService
      .getList({})
      .pipe(
        take(1),
        finalize(() => this.isLoading = false)
      );
  }

  ngOnInit(): void {
  }

}
