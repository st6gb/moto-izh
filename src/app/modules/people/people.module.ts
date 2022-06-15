import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRouterModule } from './people-routing.module';
import { PeopleCardComponent } from './people-card/people-card.component';
import { BannerComponent } from './people-list/banner/banner.component';
import { CaruselItemComponent } from './people-list/carusel-item/carusel-item.component';
import { CaruselComponent } from './people-list/carusel/carusel.component';
import { AppCaruselItemComponent } from './people-list/carusel/carusel-item/carusel-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleCardComponent,
    BannerComponent,
    CaruselItemComponent,
    CaruselComponent,
    AppCaruselItemComponent
  ],
  imports: [
    CommonModule,
    PeopleRouterModule
  ]
})
export class PeopleModule { }
