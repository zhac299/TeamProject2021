import { TestBed } from '@angular/core/testing';

import { LoginInputService } from './login-input.service';

describe('LoginInputService', () => {
  let service: LoginInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
