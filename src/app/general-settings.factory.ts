import { ColorThemesService } from './services/color-themes.service';

export function initializeGeneralSettingsFactory(colorThemes: ColorThemesService) {
  return () => {
    colorThemes.init();
  };
}
