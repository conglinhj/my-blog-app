import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from 'src/app/core/classes/tag';


@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html'
})
export class TagSelectionComponent implements OnInit {

  tags$ = new BehaviorSubject<Tag[]>([]);
  selectedTags$ = new BehaviorSubject<Tag[]>([]);
  filteredTags$: Observable<Tag[]>;
  searchKey$ = new BehaviorSubject<string>('');
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef<HTMLInputElement>;

  @Input()
  set dataSource(data: Tag[]) {
    this.tags$.next(data || []);
  }

  @Input()
  set selectedTags(tags: Tag[]) {
    this.selectedTags$.next(tags || []);
  }

  @Output() selectedTagsChanged = new EventEmitter<Tag[]>();

  ngOnInit(): void {
    this.filteredTags$ = combineLatest([
      this.tags$,
      this.selectedTags$,
      this.searchKey$
    ]).pipe(
      map(([tags, selectedTags, searchKey]) => tags.filter(tag => {
        const isNotSelected = !selectedTags.some(selectedTag => selectedTag.name === tag.name);
        return isNotSelected && tag.name.toLowerCase().indexOf(searchKey.toLowerCase()) >= 0;
      }))
    );
  }

  /**
   * Function that maps an option's control value to its display value in the trigger.
   */
  matAutoCompleteDisplayWith = (_tag: Tag): string => '';

  onSearch(value: string): void {
    this.searchKey$.next(value);
  }

  onTagRemoved(index: number): void {
    this.selectedTags$.value.splice(index, 1);
    this.selectedTags$.next(this.selectedTags$.value);
    this.selectedTagsChanged.emit(this.selectedTags$.value);
  }

  onTagselected(event: MatAutocompleteSelectedEvent): void {
    this.autocompleteInput.nativeElement.blur();
    this.selectedTags$.value.push(event.option.value);
    this.selectedTags$.next(this.selectedTags$.value);
    this.selectedTagsChanged.emit(this.selectedTags$.value);
  }
}
