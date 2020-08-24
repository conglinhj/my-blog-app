export interface ArticleData {
  id: number;
  author_id: number;
  category_id?: number;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  is_published: boolean;
  published_at: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}
