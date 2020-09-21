import { TagData } from './../interfaces/tag-data';

export class Tag {

  constructor(public data: TagData) { }

  get id(): number {
    return this.data.id;
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
