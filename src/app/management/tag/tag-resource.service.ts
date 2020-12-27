import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Tag } from 'src/app/core/classes/tag';
import { ApiResponseData } from 'src/app/core/interfaces/api-response-data';
import { TagData, TagFormData } from 'src/app/core/interfaces/tag-data';


@Injectable({
  providedIn: 'root'
})
export class TagResourceService {

  readonly TAGS_API_PATH = 'resources/tags';

  constructor(private http: HttpClient) { }

  // TODO: params interfaces
  getList(params?: any): Observable<Tag[]> {
    return this.http.get<ApiResponseData<TagData[]>>(this.TAGS_API_PATH, { params }).pipe(
      mergeMap(res => {
        if (res && Array.isArray(res.data)) {
          return of(res.data.map(data => new Tag(data)));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  get(id: number): Observable<Tag> {
    return this.http.get<ApiResponseData<TagData>>(`${this.TAGS_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res && res.data) {
          return of(new Tag(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  create(postData: TagFormData): Observable<Tag> {
    return this.http.post<ApiResponseData<TagData>>(this.TAGS_API_PATH, postData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Tag(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  update(id: number, putData: TagFormData): Observable<Tag> {
    return this.http.put<ApiResponseData<TagData>>(`${this.TAGS_API_PATH}/${id}`, putData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Tag(res.data));
        }
        return throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  delete(id: number): Observable<number> {
    return this.http.delete<boolean>(`${this.TAGS_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res === true) {
          return of(id);
        }
        return throwError('FAILED');
      })
    );
  }

}
