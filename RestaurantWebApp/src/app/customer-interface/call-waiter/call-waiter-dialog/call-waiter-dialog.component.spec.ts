import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallWaiterDialogComponent } from './call-waiter-dialog.component';

describe('CallWaiterDialogComponent', () => {
  let component: CallWaiterDialogComponent;
  let fixture: ComponentFixture<CallWaiterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallWaiterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallWaiterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
