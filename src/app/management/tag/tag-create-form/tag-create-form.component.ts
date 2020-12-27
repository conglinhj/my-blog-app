import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as tagActions from '../tag.actions';
import * as tagSelectors from '../tag.selectors';


@Component({
  selector: 'app-tag-create-form',
  templateUrl: './tag-create-form.component.html',
  styleUrls: ['./tag-create-form.component.scss']
})
export class TagCreateFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.store.select(tagSelectors.createError)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(error => {
        if (error && error.getFieldErrors('name')) {
          this.form.controls.name.setErrors({ apiError: error.getFieldErrors('name')[0] });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(
        tagActions.createTag({
          data: this.form.getRawValue(),
          redirectTo: 'management/tags'
        })
      );
    }
  }

}
