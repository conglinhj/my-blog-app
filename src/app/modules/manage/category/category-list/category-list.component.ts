import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Category } from 'src/app/core/classes/category';
import * as categoryActions from './../category.actions';
import * as categorySelectors from './../category.selectors';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  categories$: Observable<Category[]>;
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.categories$ = this.store.select(categorySelectors.getListOfCategories);
    this.store.dispatch(categoryActions.getList());
  }

  onEdit(category: Category): void {
    this.router.navigate([`manage/categories/edit/${category.id}`]);
  }

  async onDelete(category: Category): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Do you want to delete the ${category.name} category?`
      }
    });

    const resutl = await dialogRef.afterClosed().toPromise();
    if (resutl === true) {
      this.store.dispatch(categoryActions.deleteCategory({ id: category.id }));
    }
  }
}
