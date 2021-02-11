import { TestBed } from '@angular/core/testing';

import { MenuFilterDbService } from './menu-filter-db.service';

describe('MenuFilterDbService', () => {
  let service: MenuFilterDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuFilterDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
