import { animate, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss'],
  animations: [
    trigger('stepByStep', [
      transition('first <=> second', [
        animate(300)
      ])
    ])
  ]
})
export class CaruselComponent implements OnInit {
  @Input() content;

  public toggle = false;
  public isAnimate = false;
  constructor(private cd: ChangeDetectorRef) { }

  autoplay = true;

  ngOnInit(): void {
    // interval(2500).subscribe(() => {
    //   this.goToNext()
    // });
  }

  goToNext(event?: any) {
    if (this.isAnimate) {
      return;
    }
    this.toggle = !this.toggle;
  }


  public handleStartAnimate($event) {
    this.isAnimate = true;
  }

  public handleEndAnimate($event) {
    const e = this.content.shift();
    this.content.push(e);
    this.isAnimate = false;
  }

  public getClassesAnimate(position: number): string {
    if (this.isAnimate) {
      return 'item-move';
    } else {
      return '';
    }
  }

}
