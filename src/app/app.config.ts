import { provideRouter } from "@angular/router";
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from "@angular/core";

import { routes } from "./app-routing";
import { ColorThemesService } from "./services/color-themes.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
        const colorThemes = inject(ColorThemesService);
        colorThemes.init();
    }),
  ]
};