import { Component, OnInit } from '@angular/core';
import { PuzzleFifteenService } from './puzzle-fifteen.service';

@Component({
  selector: 'app-puzzle-fifteen',
  templateUrl: './puzzle-fifteen.component.html',
  styleUrls: ['./puzzle-fifteen.component.scss']
})
export class PuzzleFifteenComponent implements OnInit {

  constructor(private puzzleService: PuzzleFifteenService) { }

  ngOnInit(): void {
    //
  }

}