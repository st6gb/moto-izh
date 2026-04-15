import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { concat, map, ReplaySubject, Subject, withLatestFrom, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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

  ngOnInit(): void {
    console.log('here');
    const fistSubject = new ReplaySubject(1);
    const secondSubject = new ReplaySubject(1);
    const dad = new Subject();

    dad.subscribe(console.log);
    dad.next(123);
    concat(fistSubject, secondSubject).pipe(
    )
    .subscribe((a) => console.log(a));

    fistSubject.next(true);
    secondSubject.next(false);

    secondSubject.next(true);
    fistSubject.next(false);

    secondSubject.next(false);
    secondSubject.next(true);
  }
}
