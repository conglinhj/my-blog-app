import { TestBed } from '@angular/core/testing';

import { ArticleResourceService } from './article-resource.service';

describe('ArticleResourceService', () => {
  let service: ArticleResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
