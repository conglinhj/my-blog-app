import { CategoryData } from './../interfaces/category-data';


export class Category {

  readonly id: number;
  readonly slug: string;
  parentId: number;
  name: string;
  description: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(public data: CategoryData) {
    this.id = data.id;
    this.parentId = data.parent_id;
    this.slug = data.slug;
    this.name = data.name;
    this.description = data.description;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
