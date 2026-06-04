import { provideRouter } from '@angular/router';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { routes } from './app-routing';
import { ColorThemesService } from './services/color-themes.service';
import { provideFormlyCore } from '@ngx-formly/core';
import { withFormlyPrimeNG } from '@ngx-formly/primeng';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const colorThemes = inject(ColorThemesService);
      colorThemes.init();
    }),
    provideFormlyCore([
      ...withFormlyPrimeNG(),
      {
        validationMessages: [{ name: 'required', message: 'This field is required' }],
      },
    ]),
    providePrimeNG({
      theme: {
        preset: Material,
      },
    }),
  ],
};
