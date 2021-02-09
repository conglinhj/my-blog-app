
export type ArticleBulkActionName = 'publish' | 'draft' | 'delete';

export interface ArticleBulkActionRequestParams {
  article_ids: number[];
  action_name: ArticleBulkActionName;
}
