import { TestBed } from '@angular/core/testing';

import { IsLoginGuard } from './is-loging.guard';

describe('LoginPageGuard', () => {
  let guard: IsLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
