import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/classes/api-error';
import { CategoryDataService } from 'src/app/services/category-data.service';


@Component({
  selector: 'app-category-create-form',
  templateUrl: './category-create-form.component.html',
  styleUrls: ['./category-create-form.component.scss']
})
export class CategoryCreateFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private categoryDataService: CategoryDataService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }
    this.categoryDataService.create(this.form.getRawValue()).subscribe({
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
