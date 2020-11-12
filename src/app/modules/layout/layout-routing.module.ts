import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'schedule',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: PublicLayoutComponent,
    loadChildren: () => import('../login/login.module').then(module => module.LoginModule) },
  {
    path: 'schedule',
    component: PrivateLayoutComponent,
    loadChildren: () => import('../schedule/schedule.module').then(module => module.ScheduleModule)
  },
  {
    path: 'game',
    component: PrivateLayoutComponent,
    loadChildren: () => import('../puzzle-fifteen/puzzle-fifteen.module').then(module => module.PuzzleFifteenModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
