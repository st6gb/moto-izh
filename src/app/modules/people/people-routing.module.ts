import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleCardComponent } from './people-card/people-card.component';
import { PeopleListComponent } from './people-list/people-list.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  },
  {
    path: 'people-card/:id',
    component: PeopleCardComponent
  },
  {
    path: 'people-card',
    component: PeopleCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRouterModule {}
