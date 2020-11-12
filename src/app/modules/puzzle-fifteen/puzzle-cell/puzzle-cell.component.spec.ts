import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCellComponent } from './puzzle-cell.component';

describe('PuzzleCellComponent', () => {
  let component: PuzzleCellComponent;
  let fixture: ComponentFixture<PuzzleCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
