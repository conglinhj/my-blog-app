import { TagState } from '../../modules/manage/tag/tag.reducer';
import { CategoryState } from './../../modules/manage/category/category.reducers';

export interface AppState {
  tag: TagState;
  category: CategoryState;
}
