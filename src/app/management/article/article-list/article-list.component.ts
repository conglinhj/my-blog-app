import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, filter, finalize, first, mergeMap, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Article } from 'src/app/core/classes/article';
import { ArticleBulkActionName } from '../article-resource.interface';
import { ArticleResourceService } from '../article-resource.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  animations: []
})
export class ArticleListComponent implements OnDestroy {

  displayedColumns: string[] = ['selection', 'id', 'isPublished', 'title', 'actions'];
  isLoading = false;
  selection = new SelectionModel<number>(true, []);
  dataSource = new MatTableDataSource<Article>([]);
  unsubscriber$ = new Subject();
  pageSizeOptions: number[] = [10, 20, 50];
  pagination$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
    length: 0
  });
  sort$ = new BehaviorSubject<{ [key: string]: string }>({});
  collectionChanged$ = new Subject();
  withDeleted$ = new BehaviorSubject<boolean>(true);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private articleResourceService: ArticleResourceService,
  ) {
    combineLatest([
      this.pagination$.pipe(debounceTime(300)),
      this.sort$.pipe(debounceTime(300)),
      this.withDeleted$.pipe(debounceTime(300)),
      this.collectionChanged$.pipe(startWith(''))
    ]).pipe(
      switchMap(([pagination, sort, withDeleted]) => {
        this.isLoading = true;
        return this.articleResourceService
          .getList({
            page: String(pagination.pageIndex + 1),
            limit: String(pagination.pageSize),
            with_deleted: String(!!withDeleted),
            sort: JSON.stringify(sort).slice(1, -1).replace(/"/g, '')
          })
          .pipe(
            first(),
            finalize(() => this.isLoading = false),
            tap({
              next: (articleCollection) => {
                this.dataSource.data = articleCollection.data;
                this.pagination$.value.length = articleCollection.total;
              },
              error: () => this.snackBar.open('Fetching failed!')
            }),
            catchError(() => EMPTY)
          )
      }),
      takeUntil(this.unsubscriber$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.complete();
  }

  isChecked = (articleId: number, _selectedLength: number): boolean => {
    return this.selection.isSelected(articleId);
  }

  onselectionChange(event: MatCheckboxChange): void {
    event.checked
      ? this.dataSource.data.forEach(article => this.selection.select(article.id))
      : this.selection.clear();
  }

  onPaging(event: PageEvent): void {
    this.pagination$.next(event);
  }

  onSortChange(event: Sort): void {
    const sort = this.sort$.value;
    if (event.direction) {
      sort[event.active] = event.direction;
    } else {
      delete sort[event.active];
    }
    this.sort$.next(sort);
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
        next: () => {
          this.snackBar.open(`${actionName} succeed`);
          this.selection.clear();
          this.collectionChanged$.next();
        },
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
        next: () => {
          this.snackBar.open('Published');
          this.collectionChanged$.next();
        },
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
        next: () => {
          this.snackBar.open('Drafted');
          this.collectionChanged$.next();
        },
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
        next: () => {
          this.snackBar.open('Deleted');
          this.collectionChanged$.next();
        },
        error: () => this.snackBar.open('Failed!')
      });
  }
}
