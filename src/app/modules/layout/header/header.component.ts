import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColorThemesService } from '../../../services/color-themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  colorThemesControl = new FormControl();
  constructor(
    private colorThemesService: ColorThemesService,
    @Inject(DOCUMENT) private document: Document
    ) { }

  ngOnInit(): void {
    this.colorThemesControl.valueChanges.subscribe((value) => {
      if (value) {
        this.document.body.classList.add('dark-theme');
      } else {
        this.document.body.classList.remove('dark-theme');
      }
    });
    this.colorThemesControl.setValue(this.colorThemesService.settings.isDarkTheme);
  }

}
