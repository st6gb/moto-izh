import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { LayoutModule } from './modules/layout/layout.module';
import { NoopInterceptor } from './http-interceptors/noop-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCoreModule } from './modules/httpCore/http-core.module';
import { RegisterIcons } from './modules/shared/register-icons.service';
import { ColorThemesService } from './services/color-themes.service';
import { initializeGeneralSettingsFactory } from './general-settings.factory';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpCoreModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeGeneralSettingsFactory,
      deps: [ColorThemesService],
      multi: true
    }
  ]
})
export class AppModule {
  constructor(private registerIconService: RegisterIcons) {
    this.registerIconService.registerAllIcons();
  }
}
