import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/interfaces/app-state';
import { TagState } from './tag.reducer';


export const tagState = (state: AppState) => state.tag;

export const selectedTag = createSelector(
  tagState,
  (tag: TagState) => tag.selectedTag
);

export const listOfTags = createSelector(
  tagState,
  (tag: TagState) => tag.list
);

export const updateError = createSelector(
  tagState,
  (tag: TagState) => tag.updateError
);

export const createError = createSelector(
  tagState,
  (tag: TagState) => tag.createError
);
