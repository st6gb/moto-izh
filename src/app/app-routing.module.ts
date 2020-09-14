import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/login/login.module').then(module => module.LoginModule) },
  { path: 'schedule', loadChildren: () => import('./modules/schedule/schedule.module').then(module => module.ScheduleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
