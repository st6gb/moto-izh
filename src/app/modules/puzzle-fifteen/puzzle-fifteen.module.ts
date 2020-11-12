import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleRoutingModule } from './puzzle-fifteen-routing.module';
import { PuzzleCellComponent } from './puzzle-cell/puzzle-cell.component';
import { PuzzleFifteenService } from './puzzle-fifteen.service';




@NgModule({
  declarations: [
    PuzzleCellComponent
  ],
  providers: [
    PuzzleFifteenService,
  ],
  imports: [
    CommonModule,
    PuzzleRoutingModule
  ]
})
export class PuzzleFifteenModule { }
