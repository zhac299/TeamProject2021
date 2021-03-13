import { TestBed } from '@angular/core/testing';

import { MenuCategoryServiceService } from './menu-category-service.service';

describe('MenuCategoryServiceService', () => {
  let service: MenuCategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuCategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
