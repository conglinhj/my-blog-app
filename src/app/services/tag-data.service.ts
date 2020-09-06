import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Tag } from '../classes/tag';
import { TagData } from '../interfaces/tag-data';


@Injectable({
  providedIn: 'root'
})
export class TagDataService {

  readonly TAGS_API_PATH = 'tags';

  constructor(private http: HttpClient) { }

  // TODO: params interfaces
  getList(params: any): Observable<Tag[]> {
    return this.http.get<TagData[]>(this.TAGS_API_PATH, { params }).pipe(
      mergeMap(res => {
        if (Array.isArray(res)) {
          return of(res.map(data => new Tag(data)));
        }
        throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  get(id: number): Observable<Tag> {
    return this.http.get<{ data: TagData }>(`${this.TAGS_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res && res.data) {
          return of(new Tag(res.data));
        }
        throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  // TODO: params interfaces
  create(postData: any): Observable<Tag> {
    return this.http.post<TagData>(this.TAGS_API_PATH, postData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Tag(res));
        }
        throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  update(id: number, putData: any): Observable<Tag> {
    return this.http.put<TagData>(`${this.TAGS_API_PATH}/${id}`, putData).pipe(
      mergeMap(res => {
        if (res) {
          return of(new Tag(res));
        }
        throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.TAGS_API_PATH}/${id}`).pipe(
      mergeMap(res => {
        if (res) {
          return of(true);
        }
        throwError('RESPONSE_DATA_IS_NOT_VALID');
      })
    );
  }

}
