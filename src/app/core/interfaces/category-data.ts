export interface CategoryData {
  id: number;
  parent_id: number;
  slug: string;
  name: string;
  description: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

export interface CategoryFormData {
  name: string;
  parent_id: number;
}
