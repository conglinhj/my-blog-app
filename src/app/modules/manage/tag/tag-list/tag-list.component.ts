import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { Tag } from 'src/app/classes/tag';
import { ConfirmDialogComponent } from './../../../../components/confirm-dialog/confirm-dialog.component';
import { TagDataService } from './../../../../services/tag-data.service';


@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  tags$: Observable<Tag[]> = new Subject<Tag[]>();

  constructor(
    private dialog: MatDialog,
    private tagDataService: TagDataService,
  ) { }

  ngOnInit(): void {
    this.tags$ = this.tagDataService.getList();
  }

  onDelete = async (tag: Tag): Promise<void> => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Do you want to delete the #${tag.name} tag?`
      }
    });

    const confirmResutl = await dialogRef.afterClosed().toPromise();
    if (confirmResutl === true) {
      if (await this.tagDataService.delete(tag.id).toPromise()) {
        location.reload(); // TODO: should do smarter
      }
    }
  }
}
