import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'carusel-item',
  templateUrl: './carusel-item.component.html',
  styleUrls: ['./carusel-item.component.scss'],
})
export class AppCaruselItemComponent implements OnInit, AfterViewInit {
  @Input() position: number;
  @Input() set animateClasses(value) {
    this.extraClasses = value;
    this.element?.nativeElement?.classList?.remove('item-shuffle');
    setTimeout(() => {
      this.element?.nativeElement?.classList?.add('item-shuffle');
    }, 300);
  }

  @ViewChild('element') element: ElementRef;
  extraClasses = '';
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.element?.nativeElement?.classList?.add('item-shuffle');
  }
}
