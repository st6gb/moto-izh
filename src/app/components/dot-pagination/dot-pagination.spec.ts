import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DotPaginationComponent } from './dot-pagination';

describe('DotPaginationComponent', () => {
  let component: DotPaginationComponent;
  let fixture: ComponentFixture<DotPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DotPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.totalDots).toBe(5);
    expect(component.currentIndex).toBe(0);
    expect(component.dotSize).toBe(8);
    expect(component.spacing).toBe(8);
    expect(component.animationDuration).toBe(300);
  });

  it('should create correct number of dots', () => {
    component.totalDots = 5;
    component.ngOnChanges({
      totalDots: {
        currentValue: 5,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.dots.length).toBe(5);
  });

  it('should mark correct dot as active', () => {
    component.totalDots = 5;
    component.currentIndex = 2;
    component.ngOnChanges({
      currentIndex: {
        currentValue: 2,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.dots[2].isActive).toBe(true);
    expect(component.dots[0].isActive).toBe(false);
    expect(component.dots[4].isActive).toBe(false);
  });

  it('should emit dotClicked event when dot is clicked', () => {
    spyOn(component.dotClicked, 'emit');

    component.onDotClick(3);

    expect(component.dotClicked.emit).toHaveBeenCalledWith(3);
  });

  it('should update dots on totalDots change', () => {
    component.totalDots = 3;
    component.currentIndex = 0;
    component.ngOnChanges({
      totalDots: {
        currentValue: 3,
        previousValue: 5,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.dots.length).toBe(3);
  });

  it('should trigger animation on currentIndex change', (done) => {
    component.currentIndex = 1;
    component.animationDuration = 100;

    expect(component.isAnimating).toBe(false);

    component.ngOnChanges({
      currentIndex: {
        currentValue: 1,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.isAnimating).toBe(true);

    setTimeout(() => {
      expect(component.isAnimating).toBe(false);
      done();
    }, 150);
  });

  it('should generate correct dot style object', () => {
    component.dotSize = 10;
    component.spacing = 6;
    component.activeColor = '#ff0000';
    component.inactiveColor = '#00ff00';

    const activeDot = { index: 0, isActive: true };
    const activeDotStyle = component.getDotStyle(activeDot);

    expect(activeDotStyle['width.px']).toBe(20);
    expect(activeDotStyle['height.px']).toBe(10);
    expect(activeDotStyle['background-color']).toBe('#ff0000');

    const inactiveDot = { index: 1, isActive: false };
    const inactiveDotStyle = component.getDotStyle(inactiveDot);

    expect(inactiveDotStyle['width.px']).toBe(10);
    expect(inactiveDotStyle['background-color']).toBe('#00ff00');
  });

  it('should generate correct container style', () => {
    component.spacing = 10;
    const style = component.getContainerStyle();

    expect(style['gap.px']).toBe(10);
  });

  it('should update animations on config change', (done) => {
    component.totalDots = 5;
    component.currentIndex = 0;
    component.animationDuration = 200;

    component.ngOnChanges({
      currentIndex: {
        currentValue: 2,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.isAnimating).toBe(true);

    setTimeout(() => {
      expect(component.isAnimating).toBe(false);
      done();
    }, 250);
  });
});
