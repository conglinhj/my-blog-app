export interface TagData {
  id: number;
  slug: string;
  name: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

export interface TagFormData {
  name: string;
}
