import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { ArticleData } from 'src/app/core/interfaces/article-data';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  form: FormGroup;
  formChanging: boolean;
  isSavedAutomatically: boolean;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      content: new FormControl('')
    });

    this.form.valueChanges
      .pipe(
        tap(() => {
          this.formChanging = true;
          this.isSavedAutomatically = false;
        }),
        debounceTime(3000),
        tap(data => {
          this.formChanging = false;
          this.autoSave(data);
        })
      )
      .subscribe();
  }

  private autoSave(article: ArticleData): void {
    console.log(article);
    this.isSavedAutomatically = true;
    setTimeout(() => this.isSavedAutomatically = false, 10 * 1000);
  }
}
