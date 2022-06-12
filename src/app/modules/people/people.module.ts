import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRouterModule } from './people-routing.module';
import { PeopleCardComponent } from './people-card/people-card.component';
import { BannerComponent } from './people-list/banner/banner.component';



@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleCardComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    PeopleRouterModule
  ]
})
export class PeopleModule { }
