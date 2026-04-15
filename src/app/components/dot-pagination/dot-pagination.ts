import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotPaginationConfig, DotItem } from './dot-pagination.model';

@Component({
  selector: 'app-dot-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dot-pagination.html',
  styleUrl: './dot-pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotPaginationComponent implements OnChanges {
  @Input() totalDots: number = 5;
  @Input() currentIndex: number = 0;
  @Input() dotSize: number = 8;
  @Input() spacing: number = 8;
  @Input() animationDuration: number = 300;
  @Input() activeColor: string = '#ffffff';
  @Input() inactiveColor: string = 'rgba(255, 255, 255, 0.4)';

  @Output() dotClicked = new EventEmitter<number>();

  dots: DotItem[] = [];
  previousIndex: number = 0;
  isAnimating: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalDots'] || changes['currentIndex']) {
      this.updateDots();
      this.triggerAnimation();
    }
  }

  private updateDots(): void {
    this.dots = Array.from({ length: this.totalDots }, (_, i) => ({
      index: i,
      isActive: i === this.currentIndex,
    }));
  }

  private triggerAnimation(): void {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, this.animationDuration);
    this.previousIndex = this.currentIndex;
  }

  onDotClick(index: number): void {
    this.dotClicked.emit(index);
  }

  getDotStyle(dot: DotItem) {
    return {
      'width.px': dot.isActive ? this.dotSize * 2 : this.dotSize,
      'height.px': this.dotSize,
      'margin.px': `0 ${this.spacing / 2}px`,
      'background-color': dot.isActive ? this.activeColor : this.inactiveColor,
      'transition': `all ${this.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  }

  getContainerStyle() {
    return {
      'gap.px': this.spacing,
    };
  }
}
