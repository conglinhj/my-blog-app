import { TagState } from 'src/app/management/tag/tag.reducer';
import { CategoryState } from 'src/app/management/category/category.reducers';

export interface AppState {
  tag: TagState;
  category: CategoryState;
}
