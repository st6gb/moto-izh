import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusComponent } from './bus/bus.component';
import { ScheduleComponent } from './schedule.component';
import { TramComponent } from './tram/tram.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tram',
  },
  {
    path: 'tram',
    component: ScheduleComponent,
    children: [
      { path: '', component: TramComponent },
    ]
  },
  {
    path: 'bus',
    component: ScheduleComponent,
    children: [
      { path: '', component: BusComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
