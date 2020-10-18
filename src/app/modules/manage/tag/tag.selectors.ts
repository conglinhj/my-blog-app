import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tagFeature, TagState } from './tag.reducer';

export const getTagState = createFeatureSelector<TagState>(tagFeature.key);

export const selectedTag = createSelector(
  getTagState,
  state => state.selectedTag
);

export const listOfTags = createSelector(
  getTagState,
  state => state.list
);

export const updateError = createSelector(
  getTagState,
  state => state.updateError
);

export const createError = createSelector(
  getTagState,
  state => state.createError
);
