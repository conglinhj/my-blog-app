import { ArticleData } from './../interfaces/article-data';

export class Article {

  constructor(public data: ArticleData) { }

  get id(): number {
    return this.data.id;
  }

  get authorId(): number {
    return this.data.author_id;
  }

  get categoryId(): number {
    return this.data.category_id;
  }

  set categoryId(value: number) {
    this.data.category_id = value;
  }

  get slug(): string {
    return this.data.slug;
  }

  get title(): string {
    return this.data.title;
  }

  set title(value: string) {
    this.data.title = value;
  }

  get description(): string {
    return this.data.description;
  }

  set description(value: string) {
    this.data.description = value;
  }

  get content(): string {
    return this.data.content;
  }

  set content(value: string) {
    this.data.content = value;
  }

  get isPublished(): boolean {
    return this.data.is_published;
  }

  get publishedAt(): number {
    return this.data.published_at;
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
