import { TestBed } from '@angular/core/testing';

import { TagResourceService } from './tag-resource.service';

describe('TagResourceService', () => {
  let service: TagResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
