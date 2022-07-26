import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentCategoriesComponent } from './restaurent-categories.component';

describe('RestaurentCategoriesComponent', () => {
  let component: RestaurentCategoriesComponent;
  let fixture: ComponentFixture<RestaurentCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurentCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
