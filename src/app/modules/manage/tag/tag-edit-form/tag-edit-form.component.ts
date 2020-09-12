import { mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiError } from 'src/app/classes/api-error';
import { TagDataService } from 'src/app/services/tag-data.service';
import { Tag } from 'src/app/classes/tag';


@Component({
  selector: 'app-tag-edit-form',
  templateUrl: './tag-edit-form.component.html',
  styleUrls: ['./tag-edit-form.component.scss']
})
export class TagEditFormComponent implements OnInit {

  form: FormGroup;
  tag: Tag;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tagDataService: TagDataService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          return this.tagDataService.get(+params.id);
        })
      )
      .subscribe({
        next: (tag: Tag) => {
          this.tag = tag;
          this.form.controls.name.setValue(tag.name);
        },
        error: () => {
          this.router.navigate(['manage/tags']);
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }
    this.tagDataService.update(this.tag.id, this.form.getRawValue()).subscribe({
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
