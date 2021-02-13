import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesSliderComponent } from './calories-slider.component';

describe('CaloriesSliderComponent', () => {
  let component: CaloriesSliderComponent;
  let fixture: ComponentFixture<CaloriesSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaloriesSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloriesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
