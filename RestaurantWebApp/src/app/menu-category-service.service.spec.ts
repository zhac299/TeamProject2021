import { TestBed } from '@angular/core/testing';

import { MenuCategoryService } from './menu-category.service';

describe('MenuCategoryServiceService', () => {
  let service: MenuCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
