import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPannelComponent } from './expansion-pannel.component';

describe('ExpansionPannelComponent', () => {
  let component: ExpansionPannelComponent;
  let fixture: ComponentFixture<ExpansionPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpansionPannelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
