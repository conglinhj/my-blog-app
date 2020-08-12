import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntegerNumberDirective } from './directives/integer-number.directive';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    IntegerNumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    IntegerNumberDirective
  ],
  providers: []
})
export class SharedModule { }
