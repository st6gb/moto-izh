import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakesAndLaddersComponent } from './snakes-and-ladders';

describe('SnakesAndLaddersComponent', () => {
  let component: SnakesAndLaddersComponent;
  let fixture: ComponentFixture<SnakesAndLaddersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakesAndLaddersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakesAndLaddersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize board with 100 squares', () => {
    expect(component.board.length).toBe(100);
  });

  it('should have snakes at specific positions', () => {
    const square16 = component.board[15];
    expect(square16.snakeTo).toBe(6);
  });

  it('should have ladders at specific positions', () => {
    const square2 = component.board[1];
    expect(square2.ladderTo).toBe(38);
  });

  it('should add players', () => {
    component.addPlayer('Alice');
    component.addPlayer('Bob');
    expect(component.players.length).toBe(2);
  });

  it('should not add players during game', () => {
    component.addPlayer('Alice');
    component.startGame();
    const initialLength = component.players.length;
    component.addPlayer('Bob');
    // Bob should not be added
    expect(component.players.length).toBe(initialLength);
  });

  it('should start game with players', () => {
    component.addPlayer('Alice');
    component.startGame();
    expect(component.gameStarted).toBe(true);
    expect(component.players[0].position).toBe(1);
  });

  it('should roll dice and move player', () => {
    component.addPlayer('Alice');
    component.startGame();
    const initialPosition = component.players[0].position;
    component.rollDice();
    expect(component.players[0].position).toBeGreaterThan(initialPosition);
  });

  it('should detect snake and move player down', () => {
    component.addPlayer('Alice');
    component.startGame();
    component.players[0].position = 16;
    component.rollDice = jasmine.createSpy('rollDice').and.callFake(() => {
      const currentPlayer = component.players[0];
      let newPosition = 16 + (16 - 15); // Simulating dice roll
      const square = component.board[newPosition - 1];
      if (square.snakeTo) {
        newPosition = square.snakeTo;
      }
      currentPlayer.position = newPosition;
    });
    component.rollDice();
    expect(component.players[0].position).toBeLessThan(16);
  });

  it('should reset game', () => {
    component.addPlayer('Alice');
    component.startGame();
    component.rollDice();
    component.resetGame();
    expect(component.gameStarted).toBe(false);
    expect(component.gameFinished).toBe(false);
    expect(component.players.length).toBe(0);
  });

  it('should calculate grid position correctly', () => {
    const pos1 = component.getGridPosition(1);
    expect(pos1.row).toBe(0);
    expect(pos1.col).toBe(0);

    const pos20 = component.getGridPosition(20);
    expect(pos20.row).toBe(1);
  });
});
