import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { filter, finalize, first, mergeMap, take, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Article } from 'src/app/core/classes/article';
import { ArticleBulkActionName } from '../article-resource.interface';
import { ArticleResourceService } from '../article-resource.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {

  displayedColumns: string[] = ['selection', 'id', 'status', 'title', 'actions'];
  isLoading = true;
  selection = new SelectionModel<number>(true, []);
  dataSource = new MatTableDataSource<Article>([]);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private articleResourceService: ArticleResourceService,
  ) {
    this.articleResourceService
      .getList({})
      .pipe(
        first(),
        finalize(() => this.isLoading = false),
        tap(articles => {
          this.dataSource.data = articles;
        })
      )
      .subscribe({
        error: () => this.snackBar.open('Failed!')
      });
  }

  isChecked = (articleId: number, _selectedLength: number): boolean => {
    return this.selection.isSelected(articleId);
  }

  onselectionChange(event: MatCheckboxChange): void {
    event.checked
      ? this.dataSource.data.forEach(article => this.selection.select(article.id))
      : this.selection.clear();
  }

  onBulkAction(actionName: ArticleBulkActionName): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: `Are you sure to ${actionName} ${this.selection.selected.length} article?`
        }
      })
      .afterClosed()
      .pipe(
        filter(result => result),
        mergeMap(() => {
          return this.articleResourceService.bulkAction({
            article_ids: this.selection.selected,
            action_name: actionName
          });
        }),
        take(1),
      )
      .subscribe({
        next: () => this.snackBar.open(`${actionName} succeed`),
        error: () => this.snackBar.open('Failed!')
      });
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
        next: () => this.snackBar.open('Published'),
        error: () => this.snackBar.open('Failed!')
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
        next: () => this.snackBar.open('Drafted'),
        error: () => this.snackBar.open('Failed!')
      });
  }

  onDelete(article: Article): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: `Do you want to delete the ${article.title} article?`
        }
      })
      .afterClosed()
      .pipe(
        filter(result => result),
        mergeMap(() => this.articleResourceService.delete(article.id)),
        take(1),
      )
      .subscribe({
        next: () => this.snackBar.open('Deleted'),
        error: () => this.snackBar.open('Failed!')
      });
  }
}
