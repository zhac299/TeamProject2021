import { TestBed } from '@angular/core/testing';

import { InputService } from './login-input.service';

describe('LoginInputService', () => {
  let service: InputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
