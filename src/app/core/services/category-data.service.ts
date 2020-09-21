import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Category } from '../classes/category';
import { ApiResponseData } from '../interfaces/api-response-data';
import { CategoryData } from '../interfaces/category-data';


@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  readonly CATEGORY_API_PATH = 'categories';

  constructor(private http: HttpClient) { }

  // TODO: params interfaces
  getList(params?: any): Observable<Category[]> {
    return this.http.get<ApiResponseData<CategoryData[]>>(this.CATEGORY_API_PATH, { params }).pipe(
      mergeMap(res => {
        if (res && Array.isArray(res.data)) {
          return of(res.data.map(data => new Category(data)));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  get(id: number): Observable<Category> {
    return this.http.get<ApiResponseData<CategoryData>>(`${this.CATEGORY_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res && res.data) {
          return of(new Category(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  // TODO: params interfaces
  create(postData: any): Observable<Category> {
    return this.http.post<ApiResponseData<CategoryData>>(this.CATEGORY_API_PATH, postData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Category(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  update(id: number, putData: any): Observable<Category> {
    return this.http.put<ApiResponseData<CategoryData>>(`${this.CATEGORY_API_PATH}/${id}`, putData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Category(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.CATEGORY_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res) {
          return of(true);
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

}
