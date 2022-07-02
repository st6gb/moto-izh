import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PrivateLayoutComponent,
    PublicLayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LayoutModule { }
