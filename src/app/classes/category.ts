import { CategoryData } from './../interfaces/category-data';

export class Category {

  constructor(public data: CategoryData) { }

  get id(): number {
    return this.data.id;
  }

  get parentId(): number {
    return this.data.parent_id;
  }

  get slug(): string {
    return this.data.slug;
  }

  get name(): string {
    return this.data.name;
  }

  set name(value: string) {
    this.data.name = value;
  }

  get description(): string {
    return this.data.description;
  }

  set description(value: string) {
    this.data.description = value;
  }

  get createdAt(): number {
    return this.data.created_at;
  }

  get updatedAt(): number {
    return this.data.updated_at;
  }

  get deletedAt(): number {
    return this.data.deleted_at;
  }

}
