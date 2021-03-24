import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInterfaceComponent } from './customer-interface.component';
import { ExpansionPannelComponent } from './expansion-pannel/expansion-pannel.component';

describe('CustomerInterfaceComponent', () => {
  let component: CustomerInterfaceComponent;
  let fixture: ComponentFixture<CustomerInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInterfaceComponent,
        ExpansionPannelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
