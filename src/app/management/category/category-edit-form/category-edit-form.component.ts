import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { filter, mergeMap, first } from 'rxjs/operators';
import { Category } from 'src/app/core/classes/category';
import * as categoryActions from '../category.actions';
import * as categorySelectors from '../category.selectors';


@Component({
  selector: 'app-category-edit-form',
  templateUrl: './category-edit-form.component.html',
  styleUrls: ['./category-edit-form.component.scss']
})
export class CategoryEditFormComponent implements OnInit {

  form: FormGroup;
  category: Category;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.activatedRoute.params
      .subscribe(params => {
        this.store.dispatch(categoryActions.getCategory({ id: +params.id }));
      });

    this.store.select(categorySelectors.getSelectedCategory)
      .pipe(
        first(category => !!category),
        mergeMap(category => {
          this.form.setValue({
            name: category.name,
            description: category.description
          });
          this.form.updateValueAndValidity();
          this.category = category;
          return of(category);
        })
      )
      .subscribe({
        error: () => this.router.navigate(['management/categories'])
      });

    this.store.select(categorySelectors.getUpdateError)
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
      this.store.dispatch(categoryActions.updateCategory({
        id: this.category.id,
        data: this.form.getRawValue(),
        redirectTo: 'management/categories'
      }));
    }
  }

}
