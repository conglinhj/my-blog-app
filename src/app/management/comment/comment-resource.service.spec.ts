import { TestBed } from '@angular/core/testing';

import { CommentResourceService } from './comment-resource.service';

describe('CommentResourceService', () => {
  let service: CommentResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
