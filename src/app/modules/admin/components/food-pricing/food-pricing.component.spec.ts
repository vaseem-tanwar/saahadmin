import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPricingComponent } from './food-pricing.component';

describe('FoodPricingComponent', () => {
  let component: FoodPricingComponent;
  let fixture: ComponentFixture<FoodPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
