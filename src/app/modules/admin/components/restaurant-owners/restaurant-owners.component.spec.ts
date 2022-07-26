import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOwnersComponent } from './restaurant-owners.component';

describe('RestaurantOwnersComponent', () => {
  let component: RestaurantOwnersComponent;
  let fixture: ComponentFixture<RestaurantOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantOwnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
