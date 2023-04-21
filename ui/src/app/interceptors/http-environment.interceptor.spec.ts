import { TestBed } from '@angular/core/testing';

import { HttpEnvironmentInterceptor } from './http-environment.interceptor';

describe('HttpEnvironmentInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpEnvironmentInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpEnvironmentInterceptor = TestBed.inject(HttpEnvironmentInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
