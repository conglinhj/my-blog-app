import { TagData } from './../interfaces/tag-data';


export class Tag {

  readonly id: number;
  readonly slug: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  name: string;

  constructor(public data: TagData) {
    this.id = data.id;
    this.slug = data.slug;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.name = data.name;
  }
}
