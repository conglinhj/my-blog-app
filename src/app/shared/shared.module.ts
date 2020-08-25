import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntegerNumberDirective } from './directives/integer-number.directive';


@NgModule({
  declarations: [
    IntegerNumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IntegerNumberDirective
  ],
  providers: []
})
export class SharedModule { }
