import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() type: string;
  @Input() content: any;
  @Input() container: HTMLElement;
  @Input() position: number;

  @Output() goNext: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  constructor() { }

  public ngOnInit(): void {
  }

  public goToNext(): void {
    this.goNext.emit(this.container);
  }

}
