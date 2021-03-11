import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesListDisplayComponent } from './tables-list-display.component';

describe('TablesListDisplayComponent', () => {
  let component: TablesListDisplayComponent;
  let fixture: ComponentFixture<TablesListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
