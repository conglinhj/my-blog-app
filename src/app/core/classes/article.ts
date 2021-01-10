import { ArticleData } from './../interfaces/article-data';
import { Category } from './category';
import { Tag } from './tag';


export class Article {

  readonly id: number;
  readonly authorId: number;
  readonly slug: string;
  categoryId: number;
  title: string;
  description: string;
  content: string;
  readonly category: Category;
  readonly tags: Tag[];
  readonly isPublished: boolean;
  readonly publishedAt: number;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(public data: Readonly<ArticleData>) {
    Object.freeze(data);
    this.id = data.id;
    this.authorId = data.author_id;
    this.categoryId = data.category_id;
    this.slug = data.slug;
    this.title = data.title;
    this.description = data.description;
    this.content = data.content;
    this.isPublished = data.is_published;
    this.publishedAt = data.published_at;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;

    if (data.category) {
      this.category = new Category(data.category);
    }

    this.tags = Array.isArray(data.tags) ? data.tags.map(tag => new Tag(tag)) : [];
  }
}
