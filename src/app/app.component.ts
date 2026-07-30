import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User, OldUser } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterOutlet]
})
export class App implements OnInit {
  title = 'bikeizh-web';

  public substituteParams(text: string, params: {[key: string]: string}): string {
    for (const [key, value] of Object.entries(params)) {
      const regExp = new RegExp(key, 'g');
      text = text.replace(regExp, value);
    }
    return text;
  }

  /**
   * Map an OldUser shape to the modern User shape.
   */
  public mapOldUserToUser(oldUser: OldUser): User {
    return {
      id: Number(oldUser.idn),
      name: oldUser.names,
      email: oldUser.emails,
      password: oldUser.passwords,
      role: oldUser.roles,
      createdAt: new Date(oldUser.createdAt),
      updatedAt: new Date(oldUser.updatedAt),
    };
  }

  ngOnInit(): void {

  }
}
