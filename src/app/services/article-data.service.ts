import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Article } from '../classes/article';
import { ArticleData } from '../interfaces/article-data';
import { ArticleListRequestParams } from '../interfaces/article-list-request-params';


@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  readonly ARTICLES_API_PATH = 'articles';

  constructor(private http: HttpClient) { }

  getList(params: ArticleListRequestParams): Observable<Article[]> {
    const formatedParams = {
      page: String(params.page),
      limit: String(params.limit)
    };

    return this.http.get<ArticleData[]>(this.ARTICLES_API_PATH, { params: formatedParams }).pipe(
      mergeMap(res => {
        if (Array.isArray(res)) {
          return of(res.map(data => new Article(data)));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  get(id: number): Observable<Article[]> {
    return this.http.get<ArticleData[]>(`${this.ARTICLES_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (Array.isArray(res)) {
          return of(res.map(data => new Article(data)));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  create(postData: any): Observable<Article> {
    return this.http.post<ArticleData>(this.ARTICLES_API_PATH, postData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Article(res));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  update(id: number, putData: any): Observable<Article> {
    return this.http.put<ArticleData>(`${this.ARTICLES_API_PATH}/${id}`, putData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Article(res));
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

}
