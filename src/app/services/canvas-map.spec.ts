import { TestBed } from '@angular/core/testing';

import { CanvasMapService } from './canvas-map.service';

describe('CanvasMap', () => {
  let service: CanvasMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
