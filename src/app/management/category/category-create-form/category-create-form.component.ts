import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as categoryActions from '../category.actions';
import * as categorySelectors from '../category.selectors';


@Component({
  selector: 'app-category-create-form',
  templateUrl: './category-create-form.component.html',
  styleUrls: ['./category-create-form.component.scss']
})
export class CategoryCreateFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.store.select(categorySelectors.getCreateError)
      .pipe(filter(error => !!error))
      .subscribe(error => {
        if (error.getFieldErrors('name')) {
          this.form.controls.name.setErrors({ apiError: error.getFieldErrors('name')[0] });
        }
        if (error.getFieldErrors('description')) {
          this.form.controls.description.setErrors({ apiError: error.getFieldErrors('description')[0] });
        }
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(categoryActions.createCategory({
        data: this.form.getRawValue(),
        redirectTo: 'management/categories'
      }));
    }
  }

}
