import { Injectable } from '@angular/core';
import { Coordinates } from './coodinates';

@Injectable({
  providedIn: 'root'
})
export class PuzzleFifteenService {
  _order: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  _field = 4;
  constructor() { }

  get order() {
    return this._order;
  }

  public calculateCoordinates(item: number): Coordinates {
    const x = this.order.indexOf(item) % this._field;
    const y = Math.floor(this.order.indexOf(item) / this._field);
    return new Coordinates(x, y);
  }
}
