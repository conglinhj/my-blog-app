import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/core/classes/tag';
import { AppState } from 'src/app/core/interfaces/app-state';
import { ConfirmDialogComponent } from './../../../../components/confirm-dialog/confirm-dialog.component';
import { deleteTag, getList } from './../tag.actions';
import * as tagSelectors from './../tag.selectors';


@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {

  tags$: Observable<Tag[]>;
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.store.dispatch(getList());
    this.tags$ = this.store.select(tagSelectors.listOfTags);
  }

  onEdit(tag: Tag): void {
    this.router.navigate([`manage/tags/edit/${tag.id}`]);
  }

  onDelete(tag: Tag): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Do you want to delete the #${tag.name} tag?`
      }
    });

    dialogRef.afterClosed().subscribe(ok => ok && this.store.dispatch(deleteTag({ id: tag.id })));
  }
}
