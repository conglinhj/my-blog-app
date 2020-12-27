import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/core/classes/api-error';
import { Category } from 'src/app/core/classes/category';
import * as categoryActions from './category.actions';


export interface CategoryState {
  list: Category[];
  selectedCategory: Category;
  createError: ApiError;
  updateError: ApiError;
  deleteError: ApiError;
}

const initialState: CategoryState = {
  list: [],
  selectedCategory: null,
  createError: null,
  updateError: null,
  deleteError: null
};

const _reducer = createReducer(
  initialState,
  on(categoryActions.getListSuccess, (state, { list }) => {
    return { ...state, list };
  }),
  on(categoryActions.getCategorySuccess, (state, { category }) => {
    return { ...state, selectedCategory: category };
  }),
  on(categoryActions.createCategorySuccess, (state, { category }) => {
    if (!state.list || !state.list.length) {
      return { ...state };
    }
    return { ...state, list: [...state.list, category], createError: null };
  }),
  on(categoryActions.createCategoryFailed, (state, { error }) => {
    return { ...state, createError: error };
  }),
  on(categoryActions.updateCategorySuccess, (state, { category }) => {
    const list = [...state.list];
    const index = list.findIndex(item => item.id === category.id);
    if (index >= 0) {
      list[index] = category;
    }
    return { ...state, list, updateError: null};
  }),
  on(categoryActions.updateCategoryFailed, (state, { error }) => {
    return { ...state, updateError: error };
  }),
  on(categoryActions.deleteCategorySuccess, (state, { id }) => {
    return {
      ...state,
      list: state.list.filter(category => category.id !== id),
      deleteError: null
    };
  }),
  on(categoryActions.deleteCategoryFailed, (state, { error }) => {
    return { ...state, deleteError: error };
  })
);

function reducers(state: CategoryState, action: Action): CategoryState {
  return _reducer(state, action);
}

export const categoryFeature = { key: 'category', reducers };
