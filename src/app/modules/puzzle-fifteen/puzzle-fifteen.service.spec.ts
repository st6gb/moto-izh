import { TestBed } from '@angular/core/testing';

import { PuzzleFifteenService } from './puzzle-fifteen.service';

describe('PuzzleFifteenService', () => {
  let service: PuzzleFifteenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleFifteenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
