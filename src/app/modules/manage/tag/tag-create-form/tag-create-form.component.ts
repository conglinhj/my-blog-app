import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/classes/api-error';
import { TagDataService } from './../../../../services/tag-data.service';


@Component({
  selector: 'app-tag-create-form',
  templateUrl: './tag-create-form.component.html',
  styleUrls: ['./tag-create-form.component.scss']
})
export class TagCreateFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tagDataService: TagDataService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }
    this.tagDataService.create(this.form.getRawValue()).subscribe({
      next: _tag => {
        this.router.navigate(['manage/tags']);
      },
      error: (error: ApiError) => {
        if (error.getFieldErrors('name')) {
          this.form.controls.name.setErrors({ apiError: error.getFieldErrors('name')[0] });
        }
      }
    });
  }
}
