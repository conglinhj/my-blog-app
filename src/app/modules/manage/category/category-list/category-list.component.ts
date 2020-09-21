import { CategoryDataService } from 'src/app/core/services/category-data.service';
import { Category } from 'src/app/core/classes/category';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  categories$: Observable<Category[]> = new Subject<Category[]>();

  constructor(
    private dialog: MatDialog,
    private categoryDataService: CategoryDataService,
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryDataService.getList();
  }

  onDelete = async (category: Category): Promise<void> => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Do you want to delete the ${category.name} category?`
      }
    });

    const confirmResutl = await dialogRef.afterClosed().toPromise();
    if (confirmResutl === true) {
      if (await this.categoryDataService.delete(category.id).toPromise()) {
        location.reload(); // TODO: should be smarter
      }
    }
  }
}
