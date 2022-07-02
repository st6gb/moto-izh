import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class RegisterIcons {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  public registerAllIcons(): void {
    this.registerLogoIcon();
  }

  private registerLogoIcon(): void {
    // this.matIconRegistry.addSvgIcon(
    //   'logo',
    //   this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/logo.svg')
    // );
  }
}
