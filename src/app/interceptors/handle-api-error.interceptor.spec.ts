import { TestBed } from '@angular/core/testing';
import { HandleApiErrorInterceptor } from './handle-api-error.interceptor';


describe('HandleErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HandleApiErrorInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: HandleApiErrorInterceptor = TestBed.inject(HandleApiErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
