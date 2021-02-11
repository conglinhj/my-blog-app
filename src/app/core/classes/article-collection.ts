import { ArticleCollectionResponse } from '../interfaces/article-collection-response';
import { Article } from './article';

export class ArticleCollection {
  data: Article[];
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;

  constructor(collection: ArticleCollectionResponse) {
    Object.freeze(collection);

    this.data = Array.isArray(collection.data)
      ? collection.data.map(articleData => new Article(articleData))
      : [];

    this.currentPage = collection.current_page;
    this.from = collection.from;
    this.lastPage = collection.last_page;
    this.perPage = collection.per_page;
    this.to = collection.to;
    this.total = collection.total;
  }
}