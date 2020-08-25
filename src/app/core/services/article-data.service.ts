import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ArticleData } from '../interfaces/article-data';
import { ArticleListRequestParams } from '../interfaces/article-list-request-params';
import { Article } from './../models/article';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  readonly ARTICLES_API_PATH = 'articles';

  constructor(private httpApiService: HttpApiService) { }

  getList(params: ArticleListRequestParams): Observable<Article[]> {
    return this.httpApiService.get<ArticleData[]>(this.ARTICLES_API_PATH, { params }).pipe(
      mergeMap(res => {
        if (Array.isArray(res)) {
          return of(res.map(data => new Article(data)));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  get(id: number): Observable<Article[]> {
    return this.httpApiService.get<ArticleData[]>(`${this.ARTICLES_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (Array.isArray(res)) {
          return of(res.map(data => new Article(data)));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  create(postData: any): Observable<Article> {
    return this.httpApiService.post<ArticleData>(this.ARTICLES_API_PATH, postData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Article(res));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  update(id: number, putData: any): Observable<Article> {
    return this.httpApiService.put<ArticleData>(`${this.ARTICLES_API_PATH}/${id}`, putData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Article(res));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.httpApiService.delete<boolean>(`${this.ARTICLES_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res) {
          return of(true);
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

}
