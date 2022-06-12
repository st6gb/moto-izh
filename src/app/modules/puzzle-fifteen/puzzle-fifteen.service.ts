import { Injectable } from '@angular/core';
import { Coordinates } from './coodinates';

@Injectable({
  providedIn: 'root'
})
export class PuzzleFifteenService {
  _order: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  _field = 4;
  constructor() {
    this.order = this.shuffle(this.order);
  }

  get order() {
    return this._order;
  }

  set order(order: number[]) {
    this._order = order;
  }

  public calculateCoordinates(item: number): Coordinates {
    const x = this.order.indexOf(item) % this._field;
    const y = Math.floor(this.order.indexOf(item) / this._field);
    return new Coordinates(x, y);
  }

  public setNewOrder(item: number): boolean {
    const itemCoordinates = this.calculateCoordinates(item);
    const emptyOrder = this.calculateCoordinates(0);
    if (this.canReplaceOrder(itemCoordinates, emptyOrder)) {
      this.order = this.order.map(el => {
        if (el === item) {
          return 0;
        }
        if (el === 0) {
          return item;
        }
        return el;
      });
      return true;
    }
    return false;
  }

  private canReplaceOrder(first: Coordinates, zeroItem: Coordinates): boolean {
    return !!this.getAllCoordinatesWhenMoveZero(zeroItem).find(coordinate => coordinate.x === first.x && coordinate.y === first.y);
  }

  private shuffle(order: number[]): number[] {
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }

  private getAllCoordinatesWhenMoveZero(zeroCoordinates: Coordinates): Coordinates[] {
    // only 4 options
    const allCoordinates = [new Coordinates(-1, 0), new Coordinates(1, 0), new Coordinates(0, -1), new Coordinates(0, 1)];
    return allCoordinates.map(coordinate => {
      return new Coordinates(coordinate.x + zeroCoordinates.x, coordinate.y + zeroCoordinates.y);
    });
  }
}
