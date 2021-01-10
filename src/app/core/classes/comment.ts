import { CommentData } from '../interfaces/comment-data';


export class Comment {

  readonly id: number;
  readonly parentId: number;
  readonly authorId: number;
  readonly articleId: number;
  readonly createdAt: number;
  readonly updatedAt: number;
  content: string;

  constructor(public data: Readonly<CommentData>) {
    Object.freeze(data);
    this.id = data.id;
    this.parentId = data.parent_id;
    this.authorId = data.author_id;
    this.articleId = data.article_id;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.content = data.content;
  }
}
