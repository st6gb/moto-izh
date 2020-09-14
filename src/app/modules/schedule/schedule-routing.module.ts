import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TramComponent } from './tram/tram.component';

const routes: Routes = [
  { path: '', redirectTo: 'tram' },
  { path: 'tram', component: TramComponent },
  // { path: 'bus', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
