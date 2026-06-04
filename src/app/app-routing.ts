import { Routes } from '@angular/router';
import { SnakesAndLaddersComponent } from './components/snakes-and-ladders/snakes-and-ladders';
import { ChessComponent } from './components/chess/chess';
import { DotPaginationDemoComponent } from './components/dot-pagination/dot-pagination-demo';
import { FormlyFormComponent } from './components/formly-form/formly-form';

export const routes: Routes = [
  { path: '', redirectTo: '/formly-form', pathMatch: 'full' },
  { path: 'snakes-and-ladders', component: SnakesAndLaddersComponent },
  { path: 'chess', component: ChessComponent },
  { path: 'dot-pagination', component: DotPaginationDemoComponent },
  { path: 'formly-form', component: FormlyFormComponent },
];
