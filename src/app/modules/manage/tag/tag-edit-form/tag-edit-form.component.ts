import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import * as tagActions from './../tag.actions';
import * as tagSelectors from './../tag.selectors';


@Component({
  selector: 'app-tag-edit-form',
  templateUrl: './tag-edit-form.component.html',
  styleUrls: ['./tag-edit-form.component.scss']
})
export class TagEditFormComponent implements OnInit, OnDestroy {

  tagId: number;
  form: FormGroup;
  unsubscribe$ = new Subject();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({ name: ['', Validators.required] });

    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.tagId = +params.id;
        this.store.dispatch(tagActions.getTag({ id: this.tagId }));
      });

    this.store.select(tagSelectors.selectedTag)
      .pipe(
        first(tag => !!tag),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(tag => {
        this.form.setValue({ name: tag.name });
        this.form.updateValueAndValidity();
      });

    this.store.select(tagSelectors.updateError)
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
        tagActions.updateTag({
          id: this.tagId,
          data: this.form.getRawValue(),
          redirectTo: 'manage/tags'
        })
      );
    }
  }

}
