import { CommentData } from '../interfaces/comment-data';

export class Comment {

  constructor(public data: CommentData) { }

  get id(): number {
    return this.data.id;
  }

  get parentId(): number {
    return this.data.parent_id;
  }

  set parentId(value: number) {
    this.data.parent_id = value;
  }

  get authorId(): number {
    return this.data.author_id;
  }

  get articleId(): number {
    return this.data.article_id;
  }

  get content(): string {
    return this.data.content;
  }

  set content(value: string) {
    this.data.content = value;
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
