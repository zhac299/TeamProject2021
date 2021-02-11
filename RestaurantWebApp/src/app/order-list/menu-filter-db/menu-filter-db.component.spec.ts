import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFilterDBComponent } from './menu-filter-db.component';

describe('MenuFilterDBComponent', () => {
  let component: MenuFilterDBComponent;
  let fixture: ComponentFixture<MenuFilterDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFilterDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFilterDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
