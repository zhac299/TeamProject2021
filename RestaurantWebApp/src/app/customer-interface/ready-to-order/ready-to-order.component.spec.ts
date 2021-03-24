import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToOrderComponent } from './ready-to-order.component';

describe('ReadyToOrderComponent', () => {
  let component: ReadyToOrderComponent;
  let fixture: ComponentFixture<ReadyToOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadyToOrderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyToOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
