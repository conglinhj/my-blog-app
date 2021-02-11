import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Article } from 'src/app/core/classes/article';
import { ArticleCollection } from 'src/app/core/classes/article-collection';
import { ArticleCollectionResponse } from 'src/app/core/interfaces/article-collection-response';
import { ArticleData } from 'src/app/core/interfaces/article-data';
import { HttpParamsLiteral } from 'src/app/core/interfaces/http-params-literal';
import { ArticleBulkActionRequestParams } from './article-resource.interface';


@Injectable({
  providedIn: 'root'
})
export class ArticleResourceService {

  readonly ARTICLES_API_PATH = 'resources/articles';

  constructor(private http: HttpClient) { }

  getList(params: HttpParamsLiteral): Observable<ArticleCollection> {
    return this.http.get<ArticleCollectionResponse>(this.ARTICLES_API_PATH, { params: params }).pipe(
      mergeMap(res => {
        if (res && Array.isArray(res.data)) {
          return of({
            data: res.data.map(data => new Article(data)),
            currentPage: res.current_page,
            from: res.from,
            lastPage: res.last_page,
            perPage: res.per_page,
            to: res.to,
            total: res.total,
          });
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  get(id: number): Observable<Article> {
    return this.http.get<{ data: ArticleData }>(`${this.ARTICLES_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res && res.data) {
          return of(new Article(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  create(postData: any): Observable<Article> {
    return this.http.post<{ data: ArticleData }>(this.ARTICLES_API_PATH, postData).pipe(
      mergeMap(res => {
        if (res && res.data) {
          return of(new Article(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  update(id: number, putData: any): Observable<Article> {
    return this.http.put<{ data: ArticleData }>(`${this.ARTICLES_API_PATH}/${id}`, putData).pipe(
      mergeMap(res => {
        if (res && res.data) {
          return of(new Article(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.ARTICLES_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res) {
          return of(true);
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  bulkAction(postData: ArticleBulkActionRequestParams): Observable<boolean> {
    return this.http.post<boolean>(`${this.ARTICLES_API_PATH}/bulk`, postData).pipe(
      mergeMap(res => {
        if (res) {
          return of(true);
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  publishArticle(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.ARTICLES_API_PATH}/publish/${id}`, null).pipe(
      mergeMap(res => {
        if (res) {
          return of(true);
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  draftArticle(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.ARTICLES_API_PATH}/draft/${id}`, null).pipe(
      mergeMap(res => {
        if (res) {
          return of(true);
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

}
