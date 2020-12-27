import { createAction, props } from '@ngrx/store';
import { CategoryFormData } from 'src/app/core/interfaces/category-data';
import { ApiError } from 'src/app/core/classes/api-error';
import { Category } from 'src/app/core/classes/category';

export const getList = createAction('[CATEGORY MANAGEMENT] getList');
export const getListSuccess = createAction(
  '[CATEGORY MANAGEMENT] getListSuccess',
  props<{ list: Category[] }>()
);
export const getListFailed = createAction(
  '[CATEGORY MANAGEMENT] getListFailed',
  props<{ error: ApiError }>()
);

export const getCategory = createAction(
  '[CATEGORY MANAGEMENT] getCategory',
  props<{ id: number }>()
);
export const getCategorySuccess = createAction(
  '[CATEGORY MANAGEMENT] getCategorySuccess',
  props<{ category: Category }>()
);
export const getCategoryFailed = createAction(
  '[CATEGORY MANAGEMENT] getCategoryFailed',
  props<{ error: ApiError }>()
);

export const createCategory = createAction(
  '[CATEGORY MANAGEMENT] createCategory',
  props<{ data: CategoryFormData, redirectTo: string }>()
);
export const createCategorySuccess = createAction(
  '[CATEGORY MANAGEMENT] createCategorySuccess',
  props<{ category: Category }>()
);
export const createCategoryFailed = createAction(
  '[CATEGORY MANAGEMENT] createCategoryFailed',
  props<{ error: ApiError }>()
);

export const updateCategory = createAction(
  '[CATEGORY MANAGEMENT] updateCategory',
  props<{ id: number; data: CategoryFormData; redirectTo: string }>()
);
export const updateCategorySuccess = createAction(
  '[CATEGORY MANAGEMENT] updateCategorySuccess',
  props<{ category: Category }>()
);
export const updateCategoryFailed = createAction(
  '[CATEGORY MANAGEMENT] updateCategoryFailed',
  props<{ error: ApiError }>()
);

export const deleteCategory = createAction(
  '[CATEGORY MANAGEMENT] deleteCategory',
  props<{ id: number }>()
);
export const deleteCategorySuccess = createAction(
  '[CATEGORY MANAGEMENT] deleteCategorySuccess',
  props<{ id: number }>()
);
export const deleteCategoryFailed = createAction(
  '[CATEGORY MANAGEMENT] deleteCategoryFailed',
  props<{ error: ApiError }>()
);
