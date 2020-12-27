import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Article } from 'src/app/core/classes/article';
import { ArticleResourceService } from '../article-resource.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]>;
  displayedColumns: string[] = ['id', 'title', 'published', 'actions'];
  isLoading = true;

  constructor(
    private articleResourceService: ArticleResourceService,
    private route: Router,
    private dialog: MatDialog
  ) {
    this.articles$ = this.articleResourceService
      .getList({})
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      );
  }

  ngOnInit(): void {
  }

  onEdit(article: Article): void {
    this.route.navigate([`management/articles/edit/${article.id}`]);
  }

  onDelete(article: Article): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: `Do you want to delete the ${article.title} article?`
        }
      })
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === true) {
          this.articleResourceService.delete(article.id).pipe(first()).subscribe();
        }
      });
  }
}
