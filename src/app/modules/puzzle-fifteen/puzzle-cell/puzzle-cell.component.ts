import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle-cell',
  templateUrl: './puzzle-cell.component.html',
  styleUrls: ['./puzzle-cell.component.scss']
})
export class PuzzleCellComponent implements OnInit {
  @Input() order: number;
  constructor() { }

  ngOnInit(): void {
  }

}
