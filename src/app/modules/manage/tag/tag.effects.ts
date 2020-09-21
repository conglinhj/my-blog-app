import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { AppState } from 'src/app/core/interfaces/app-state';
import { TagDataService } from 'src/app/core/services/tag-data.service';
import * as tagActions from './tag.actions';

@Injectable()
export class TagEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private tagDataService: TagDataService,
    private router: Router
  ) { }

  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.getList),
      withLatestFrom(this.store.select('tag')),
      mergeMap(([_action, { list }]) =>
        list && list.length ? of(list) : this.tagDataService.getList()
      ),
      mergeMap((tags) => of(tagActions.getListSuccess({ list: tags }))),
      catchError((error) => of(tagActions.getListFailed({ error })))
    ));

  getTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.getTag),
      withLatestFrom(this.store.select('tag')),
      mergeMap(([action, { list }]) => {
        const found = list.find((tag) => tag.id === action.id);
        return found ? of(found) : this.tagDataService.get(action.id);
      }),
      mergeMap((tag) => of(tagActions.getTagSuccess({ tag }))),
      catchError((error) => of(tagActions.getTagFailed({ error })))
    ));

  createTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.createTag),
      switchMap(({ data, redirectTo }) =>
        this.tagDataService.create(data).pipe(
          mergeMap((tag) => of(tagActions.createTagSuccess({ tag }))),
          tap(() => redirectTo && this.router.navigate([redirectTo])),
          catchError((error) => of(tagActions.createTagFailed({ error })))
        )
      )
    ));

  updateTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.updateTag),
      switchMap(({ id, data, redirectTo }) =>
        this.tagDataService.update(id, data).pipe(
          mergeMap((tag) => of(tagActions.updateTagSuccess({ tag }))),
          tap(() => redirectTo && this.router.navigate([redirectTo])),
          catchError((error) => of(tagActions.updateTagFailed({ error })))
        )
      )
    ));

  deleteTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.deleteTag),
      switchMap((action) =>
        this.tagDataService.delete(action.id).pipe(
          mergeMap((id) => of(tagActions.deleteTagSuccess({ id }))),
          catchError((error) => of(tagActions.deleteTagFailed({ error })))
        )
      )
    ));
}
