import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Article } from '../classes/article';
import { ArticleData } from '../interfaces/article-data';
import { HttpParamsLiteral } from '../interfaces/http-params-literal';


@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  static readonly API_PATH = 'articles';

  constructor(private http: HttpClient) { }

  getList(params: HttpParamsLiteral): Observable<Article[]> {
    return this.http.get<{ data: ArticleData[] }>(ArticleDataService.API_PATH, { params }).pipe(
      mergeMap(res => {
        if (res && Array.isArray(res.data)) {
          return of(res.data.map(data => new Article(data)));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  get(id: number): Observable<Article> {
    return this.http.get<{ data: ArticleData }>(`${ArticleDataService.API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res && res.data) {
          return of(new Article(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }
}
