import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TagSelectionComponent } from './tag-selection.component';



@NgModule({
  declarations: [
    TagSelectionComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
  ],
  exports: [
    TagSelectionComponent
  ]
})
export class TagSelectionModule { }
