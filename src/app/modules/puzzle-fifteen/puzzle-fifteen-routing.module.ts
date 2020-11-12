import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PuzzleFifteenComponent } from './puzzle-fifteen.component';

const routes: Routes = [
  { path: '', redirectTo: 'puzzle-fifteen' },
  { path: 'puzzle-fifteen', component: PuzzleFifteenComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuzzleRoutingModule { }
