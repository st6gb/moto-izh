import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './canvas.scss',
})
export class Canvas {
  private map: string[][] = [];

}
