import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Article } from 'src/app/core/classes/article';
import { ArticleDataService } from 'src/app/core/services/article-data.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles$: Observable<Article[]>;
  isLoading = true;

  constructor(
    private articleDataService: ArticleDataService
  ) {
    this.articles$ = this.articleDataService
      .getList({})
      .pipe(
        finalize(() => this.isLoading = false)
      );
  }

  ngOnInit(): void {
  }

}
