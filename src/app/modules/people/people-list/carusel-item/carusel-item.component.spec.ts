import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaruselItemComponent } from './carusel-item.component';

describe('CaruselItemComponent', () => {
  let component: CaruselItemComponent;
  let fixture: ComponentFixture<CaruselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaruselItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaruselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
