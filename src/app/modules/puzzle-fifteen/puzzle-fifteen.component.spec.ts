import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleFifteenComponent } from './puzzle-fifteen.component';

describe('PuzzleFifteenComponent', () => {
  let component: PuzzleFifteenComponent;
  let fixture: ComponentFixture<PuzzleFifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleFifteenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
