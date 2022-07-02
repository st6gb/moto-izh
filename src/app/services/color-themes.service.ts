import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorThemesService {
  public settings = {
    colorThemes: null,
    isDarkTheme: false,
  };
  constructor() {

  }

  public init(): void {
    console.log('init');
    // some init settings
    this.settings.isDarkTheme = true;
  }
}
