import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DotPaginationComponent } from './dot-pagination';

@Component({
  selector: 'app-dot-pagination-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DotPaginationComponent],
  templateUrl: './dot-pagination-demo.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dot-pagination-demo.scss',
})
export class DotPaginationDemoComponent {
  currentSlide: number = 0;
  slides = [
    { id: 1, title: 'Slide 1', color: '#FF6B6B', description: 'Beautiful destination' },
    { id: 2, title: 'Slide 2', color: '#4ECDC4', description: 'Amazing view' },
    { id: 3, title: 'Slide 3', color: '#45B7D1', description: 'Perfect moment' },
    { id: 4, title: 'Slide 4', color: '#FFA07A', description: 'Stunning landscape' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
    { id: 5, title: 'Slide 5', color: '#98D8C8', description: 'Peaceful place' },
  ];

  autoPlayInterval: any;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  onDotClick(index: number): void {
    this.currentSlide = index;
    this.restartAutoPlay();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.restartAutoPlay();
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.restartAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  private restartAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    this.startAutoPlay();
  }

  get currentSlideData() {
    return this.slides[this.currentSlide];
  }
}
