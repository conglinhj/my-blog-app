import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, finalize, first, mergeMap, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Article } from 'src/app/core/classes/article';
import { ArticleResourceService } from '../article-resource.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {

  articles$: Observable<Article[]>;
  displayedColumns: string[] = ['id', 'title', 'published', 'actions'];
  isLoading = true;

  constructor(
    private route: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private articleResourceService: ArticleResourceService,
  ) {
    this.articles$ = this.articleResourceService
      .getList({})
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      );
  }

  onPublish(article: Article): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Publish?` }
    }).afterClosed()
      .pipe(
        filter(result => result),
        mergeMap(() => this.articleResourceService.publishArticle(article.id)),
        take(1)
      )
      .subscribe({
        next: () => {
          // TODO: update list
          this.snackBar.open('Successful');
        },
        error: () => this.snackBar.open('Failed')
      });
  }

  onDraft(article: Article): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Draft?` }
    }).afterClosed()
      .pipe(
        filter(result => result),
        mergeMap(() => this.articleResourceService.draftArticle(article.id)),
        take(1)
      )
      .subscribe({
        next: () => {
          // TODO: update list
          this.snackBar.open('Successful');
        },
        error: () => this.snackBar.open('Failed')
      });
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
