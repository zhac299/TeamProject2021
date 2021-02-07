import { TestBed } from '@angular/core/testing';

import { CustomerInterfaceService } from './customer-interface.service';

describe('CustomerInterfaceService', () => {
  let service: CustomerInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
