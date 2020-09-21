import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CategoryResourceService } from '../../../core/services/category-resource.service';
import * as categoryActions from './category.actions';
import * as categorySelectors from './category.selectors';


@Injectable()
export class CategoryEffects {

  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions,
    private categoryResourceService: CategoryResourceService
  ) { }

  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.getList),
      withLatestFrom(this.store.select(categorySelectors.getListOfCategories)),
      mergeMap(([_action, list]) => list && list.length ? of(list) : this.categoryResourceService.getList()),
      mergeMap(list => of(categoryActions.getListSuccess({ list }))),
      catchError(error => of(categoryActions.getListFailed({ error })))
    ));

  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.getCategory),
      withLatestFrom(this.store.select(categorySelectors.getListOfCategories)),
      mergeMap(([{ id }, list]) => {
        const found = list.find(item => item.id === id);
        return found ? of(found) : this.categoryResourceService.get(id);
      }),
      mergeMap(category => of(categoryActions.getCategorySuccess({ category }))),
      catchError(error => of(categoryActions.getCategoryFailed({ error })))
    ));

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.createCategory),
      switchMap(({ data, redirectTo }) =>
        this.categoryResourceService.create(data).pipe(
          mergeMap(category => of(categoryActions.createCategorySuccess({ category }))),
          tap(() => redirectTo && this.router.navigate([redirectTo])),
          catchError(error => of(categoryActions.createCategoryFailed({ error })))
        )
      )
    ));

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.updateCategory),
      switchMap(({ id, data, redirectTo }) =>
        this.categoryResourceService.update(id, data).pipe(
          mergeMap(category => of(categoryActions.updateCategorySuccess({ category }))),
          tap(() => redirectTo && this.router.navigate([redirectTo])),
          catchError(error => of(categoryActions.updateCategoryFailed({ error })))
        )
      )
    ));

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.deleteCategory),
      switchMap(({ id }) =>
        this.categoryResourceService.delete(id).pipe(
          mergeMap(() => of(categoryActions.deleteCategorySuccess({ id }))),
          catchError(error => of(categoryActions.deleteCategoryFailed({ error })))
        )
      )
    ));
}
