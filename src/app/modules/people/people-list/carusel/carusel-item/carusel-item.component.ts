import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'carusel-item',
  templateUrl: './carusel-item.component.html',
  styleUrls: ['./carusel-item.component.scss'],
})
export class AppCaruselItemComponent implements OnInit, AfterViewInit {
  @Input() items: any[];
  @Input() position: number;
  @Input() set animateClasses(value) {
    this.extraClasses = value;
    this.element?.nativeElement?.classList?.remove('item-shuffle');

  }

  @Input() set isAnimate(value) {

    if (!value && this.isLast()) {
      setTimeout(() => {
        this.element?.nativeElement?.classList?.add('item-shuffle');
      });

      // setTimeout(() => {
      //
      // }, 300);
    }
  }

  @ViewChild('element') element: ElementRef;
  extraClasses = '';
  constructor() { }


  isLast(): boolean {
    if (this.items.length === this.position + 1 && this.position === 1) {
      return true;
    } else if (this.items.length >= this.position + 1 && this.position >= 2) {
      return true;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.element?.nativeElement?.classList?.add('item-shuffle');
  }
}
