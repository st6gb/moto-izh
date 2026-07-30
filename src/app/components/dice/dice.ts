import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dice',
  imports: [],
  templateUrl: './dice.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dice.scss',
})
export class Dice {
  private sides: number | null = null;

  setDiceSides(sides: number): void {
    this.sides = sides;
  }

  getDiceSides(): number | null {
    return this.sides;
  }

  rollDice(): number {
    if (this.sides === null) {
      throw new Error('Dice sides not set.');
    }

    return Math.floor(Math.random() * this.sides) + 1;
  }
}
