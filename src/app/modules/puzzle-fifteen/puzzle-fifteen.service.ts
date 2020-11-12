import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleFifteenService {
  _order: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  constructor() { }

  get order() {
    return this._order;
  }
}
