import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListDisplayComponent } from './orders-list-display.component';

describe('OrdersListDisplayComponent', () => {
  let component: OrdersListDisplayComponent;
  let fixture: ComponentFixture<OrdersListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
