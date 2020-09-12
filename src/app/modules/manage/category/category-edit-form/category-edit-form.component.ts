import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { ApiError } from 'src/app/classes/api-error';
import { CategoryDataService } from 'src/app/services/category-data.service';
import { Category } from './../../../../classes/category';

@Component({
  selector: 'app-category-edit-form',
  templateUrl: './category-edit-form.component.html',
  styleUrls: ['./category-edit-form.component.scss']
})
export class CategoryEditFormComponent implements OnInit {

  form: FormGroup;
  category: Category;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryDataService: CategoryDataService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          return this.categoryDataService.get(+params.id);
        })
      )
      .subscribe({
        next: category => {
          this.category = category;
          this.form.setValue({
            name: category.name,
            description: category.description
          });
        },
        error: () => this.router.navigate(['manage/cateories'])
      });
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }
    this.categoryDataService.update(this.category.id, this.form.getRawValue()).subscribe({
      next: _category => {
        this.router.navigate(['manage/categories']);
      },
      error: (error: ApiError) => {
        if (error.getFieldErrors('name')) {
          this.form.controls.name.setErrors({ apiError: error.getFieldErrors('name')[0] });
        }
        if (error.getFieldErrors('description')) {
          this.form.controls.description.setErrors({ apiError: error.getFieldErrors('description')[0] });
        }
      }
    });
  }

}
