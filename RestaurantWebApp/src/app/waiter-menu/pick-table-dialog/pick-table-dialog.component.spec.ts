import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTableDialogComponent } from './pick-table-dialog.component';

describe('PickTableDialogComponent', () => {
  let component: PickTableDialogComponent;
  let fixture: ComponentFixture<PickTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
