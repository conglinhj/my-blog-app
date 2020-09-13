import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Tag } from 'src/app/classes/tag';
import { ApiError } from './../../../classes/api-error';
import * as tagActions from './tag.actions';


export interface TagState {
  list: Tag[];
  selectedTag: Tag;
  createError: ApiError;
  updateError: ApiError;
}

const initialState: TagState = {
  list: [],
  selectedTag: null,
  createError: null,
  updateError: null
};

const _tagReducer: ActionReducer<TagState> = createReducer(
  initialState,
  on(tagActions.getListSuccess, (state, { list }) => {
    return { ...state, list };
  }),
  on(tagActions.getTagSuccess, (state, { tag }) => {
    return { ...state, selectedTag: tag };
  }),
  on(tagActions.createTagSuccess, (state, { tag }) => {
    return { ...state, list: [...state.list, tag] };
  }),
  on(tagActions.createTagFailed, (state, { error }) => {
    return { ...state, createError: error };
  }),
  on(tagActions.updateTagSuccess, (state, { tag }) => {
    const list = [...state.list];
    const index = list.findIndex((t) => t.id === tag.id);
    if (index >= 0) {
      list[index] = tag;
    }
    return { ...state, list, updateError: null };
  }),
  on(tagActions.updateTagFailed, (state, { error }) => {
    return { ...state, updateError: error };
  }),
  on(tagActions.deleteTagSuccess, (state, { id }) => {
    return {
      ...state,
      list: state.list.filter((tag) => tag.id !== id),
    };
  })
);

function reducer(state: TagState, action: Action): TagState {
  return _tagReducer(state, action);
}

export const tagFeature = { stateKey: 'tag', reducer };
