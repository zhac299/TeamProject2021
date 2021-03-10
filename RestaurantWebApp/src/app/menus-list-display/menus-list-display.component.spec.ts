import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusListDisplayComponent } from './menus-list-display.component';

describe('MenusListDisplayComponent', () => {
  let component: MenusListDisplayComponent;
  let fixture: ComponentFixture<MenusListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
