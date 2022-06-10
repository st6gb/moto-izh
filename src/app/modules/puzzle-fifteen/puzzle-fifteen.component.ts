import { Component, OnInit } from '@angular/core';
import { PuzzleFifteenService } from './puzzle-fifteen.service';

@Component({
  selector: 'app-puzzle-fifteen',
  templateUrl: './puzzle-fifteen.component.html',
  styleUrls: ['./puzzle-fifteen.component.scss']
})
export class PuzzleFifteenComponent implements OnInit {

  constructor(private puzzleService: PuzzleFifteenService) { }
  get service(): PuzzleFifteenService {
    return this.puzzleService;
  }
  ngOnInit(): void {
    //
  }

  onReplace(cell: number) {
    this.puzzleService.setNewOrder(cell);
  }

}
