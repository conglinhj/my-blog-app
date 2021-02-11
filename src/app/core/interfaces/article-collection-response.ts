import { ArticleData } from "./article-data";

export interface ArticleCollectionResponse {
  data: ArticleData[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
