import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturentsComponent } from './resturents.component';

describe('ResturentsComponent', () => {
  let component: ResturentsComponent;
  let fixture: ComponentFixture<ResturentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResturentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResturentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
