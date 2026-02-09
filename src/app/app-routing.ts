import { Routes } from '@angular/router';
import { SnakesAndLaddersComponent } from './components/snakes-and-ladders/snakes-and-ladders';
import { ChessComponent } from './components/chess/chess';

export const routes: Routes = [
  { path: '', redirectTo: '/snakes-and-ladders', pathMatch: 'full' },
  { path: 'snakes-and-ladders', component: SnakesAndLaddersComponent },
  { path: 'chess', component: ChessComponent },
];
