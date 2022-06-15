import { animate, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

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
  private isAnimate = false;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  goToNext(event: any) {
    if (this.isAnimate) {
      return;
    }
    this.toggle = !this.toggle;
  }


  public handleStartAnimate($event) {
    this.isAnimate = true;
  }

  public handleEndAnimate($event) {
    this.isAnimate = false;
    const e = this.content.shift();
    this.content.push(e);
  }

  public getClassesAnimate(position: number): string {
    if (this.isAnimate) {
      return 'item-move';
    } else {
      return '';
    }
  }

}
