import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergensChipsComponent } from './allergens-chips.component';

describe('AllergensChipsComponent', () => {
  let component: AllergensChipsComponent;
  let fixture: ComponentFixture<AllergensChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllergensChipsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergensChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
