import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { Article } from 'src/app/core/classes/article';
import { ArticleResourceService } from '../article-resource.service';
import tinymce from 'tinymce';


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  form: FormGroup;
  article: Article;
  editorConfig: any = { // TODO: define type
    base_url: '/tinymce',
    suffix: '.min',
    height: 500,
    // inline: true,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | image | help',

    // TODO: this is temporary
    // reference: https://www.tiny.cloud/docs/demo/file-picker
    // tslint:disable: typedef only-arrow-functions object-literal-shorthand
    file_picker_callback: function(callback, value, meta) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      /*
        Note: In modern browsers input[type="file"] is functional without
        even adding it to the DOM, but that might not be the case in some older
        or quirky browsers like IE, so you might want to add it to the DOM
        just in case, and visually hide it. And do not forget do remove it
        once you do not need it anymore.
      */

      input.onchange = function() {
        const file = (this as any).files[0];

        const reader = new FileReader();
        reader.onload = function() {
          /*
            Note: Now we need to register the blob in TinyMCEs image blob
            registry. In the next release this part hopefully won't be
            necessary, as we are looking to handle it internally.
          */
          const id = 'blobid' + (new Date()).getTime();
          const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          const base64 = (reader.result as string).split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          /* call the callback and populate the Title field with the file name */
          callback(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      };

      input.click();
    }
  };

  constructor(
    private articleResourceService: ArticleResourceService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      content: new FormControl('')
    });

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          if (params.id) {
            return this.articleResourceService.get(params.id).pipe(first());
          }
          return of(null);
        })
      )
      .subscribe({
        next: article => {
          if (article) {
            this.article = article;
            this.form.setValue({
              title: article.title,
              description: article.description,
              content: article.content,
            }, { emitEvent: false });
          }
        }
      });
  }

  onSave(isPublished = false): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) { return; }

    const publish$ = this.article && this.article.id
      ? this.articleResourceService.update(this.article.id, { ...this.form.getRawValue(), is_published: isPublished })
      : this.articleResourceService.create(this.form.getRawValue());

    publish$.pipe(first()).subscribe({
      next: () => {
        this.snackBar.open('Successful');
      },
      error: () => {
        this.snackBar.open('Failed');
      }
    });
  }
}
