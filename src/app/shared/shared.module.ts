import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FnCallPipe } from './pipes/fn-call.pipe';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    FnCallPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // pipes
    FnCallPipe
  ],
  providers: []
})
export class SharedModule { }
