export interface DotPaginationConfig {
  totalDots: number;
  currentIndex: number;
  dotSize?: number; // in pixels
  spacing?: number; // in pixels
  animationDuration?: number; // in milliseconds
  colors?: {
    active?: string;
    inactive?: string;
  };
}

export interface DotItem {
  index: number;
  isActive: boolean;
}
