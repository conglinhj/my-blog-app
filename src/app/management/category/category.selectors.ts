import { createFeatureSelector, createSelector } from '@ngrx/store';
import { categoryFeature, CategoryState } from './category.reducers';

export const getCateogryState = createFeatureSelector<CategoryState>(categoryFeature.key);

export const getListOfCategories = createSelector(
  getCateogryState,
  state => state.list
);

export const getSelectedCategory = createSelector(
  getCateogryState,
  state => state.selectedCategory
);

export const getCreateError = createSelector(
  getCateogryState,
  state => state.createError
);

export const getUpdateError = createSelector(
  getCateogryState,
  state => state.updateError
);
