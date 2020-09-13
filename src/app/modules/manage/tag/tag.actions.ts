import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/classes/tag';
import { TagFormData } from 'src/app/interfaces/tag-data';
import { ApiError } from './../../../classes/api-error';


export const TAG_ACTION_IDS = Object.freeze({
  GET_LIST: '[TAG MANAGEMENT] getList',
  GET_LIST_SUCCESS: '[TAG MANAGEMENT] getListSuccess',
  GET_LIST_FAILED: '[TAG MANAGEMENT] getListFailed',

  GET_TAG: '[TAG MANAGEMENT] getTag',
  GET_TAG_SUCCESS: '[TAG MANAGEMENT] getTagSuccess',
  GET_TAG_FAILED: '[TAG MANAGEMENT] getTagFailed',

  CREATE_TAG: '[TAG MANAGEMENT] createTags',
  CREATE_TAG_SUCCESS: '[TAG MANAGEMENT] createTagSuccess',
  CREATE_TAG_FAILED: '[TAG MANAGEMENT] createTagsFailed',

  UPDATE_TAG: '[TAG MANAGEMENT] updateTag',
  UPDATE_TAG_SUCCESS: '[TAG MANAGEMENT] updateTagSuccess',
  UPDATE_TAG_FAILED: '[TAG MANAGEMENT] updateTagFailed',

  DELETE_TAG: '[TAG MANAGEMENT] deleteTag',
  DELETE_TAG_SUCCESS: '[TAG MANAGEMENT] deleteTagSuccess',
  DELETE_TAG_FAILED: '[TAG MANAGEMENT] deleteTagFailed',
});

export const getList = createAction(TAG_ACTION_IDS.GET_LIST);
export const getListSuccess = createAction(TAG_ACTION_IDS.GET_LIST_SUCCESS, props<{ list: Tag[] }>());
export const getListFailed = createAction(TAG_ACTION_IDS.GET_LIST_FAILED, props<{ error: ApiError }>());

export const getTag = createAction(TAG_ACTION_IDS.GET_TAG, props<{ id: number }>());
export const getTagSuccess = createAction(TAG_ACTION_IDS.GET_TAG_SUCCESS, props<{ tag: Tag }>());
export const getTagFailed = createAction(TAG_ACTION_IDS.GET_TAG_FAILED, props<{ error: ApiError }>());

export const createTag = createAction(TAG_ACTION_IDS.CREATE_TAG, props<{ data: TagFormData, redirectTo?: string }>());
export const createTagSuccess = createAction(TAG_ACTION_IDS.CREATE_TAG_SUCCESS, props<{ tag: Tag }>());
export const createTagFailed = createAction(TAG_ACTION_IDS.CREATE_TAG_FAILED, props<{ error: ApiError }>());

export const updateTag = createAction(TAG_ACTION_IDS.UPDATE_TAG, props<{ id: number, data: TagFormData, redirectTo?: string }>());
export const updateTagSuccess = createAction(TAG_ACTION_IDS.UPDATE_TAG_SUCCESS, props<{ tag: Tag }>());
export const updateTagFailed = createAction(TAG_ACTION_IDS.UPDATE_TAG_FAILED, props<{ error: ApiError }>());

export const deleteTag = createAction(TAG_ACTION_IDS.DELETE_TAG, props<{ id: number }>());
export const deleteTagSuccess = createAction(TAG_ACTION_IDS.DELETE_TAG_SUCCESS, props<{ id: number }>());
export const deleteTagFailed = createAction(TAG_ACTION_IDS.DELETE_TAG_FAILED, props<{ error: ApiError }>());
