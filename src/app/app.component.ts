import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet]
})
export class App {
  title = 'bikeizh-web';

  public substituteParams(text: string, params: {[key: string]: string}): string {
    for (const [key, value] of Object.entries(params)) {
      const regExp = new RegExp(key, 'g');
      text = text.replace(regExp, value);
    }
    return text;
  }
}
