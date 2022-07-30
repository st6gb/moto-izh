import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bikeizh-web';

  public substituteParams(text: string, params: {[key: string]: string}): string {
    for (const [key, value] of Object.entries(params)) {
      const regExp = new RegExp(key, 'g');
      text = text.replace(regExp, value);
    }
    return text;
  }
}
