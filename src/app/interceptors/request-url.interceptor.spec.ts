import { TestBed } from '@angular/core/testing';
import { RequestUrlInterceptor } from './request-url.interceptor';


describe('RequestUrlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestUrlInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: RequestUrlInterceptor = TestBed.inject(RequestUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
