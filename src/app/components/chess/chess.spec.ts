import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChessComponent } from './chess';

describe('ChessComponent', () => {
  let component: ChessComponent;
  let fixture: ComponentFixture<ChessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize board with correct piece positions', () => {
    // Check white pawns
    for (let col = 0; col < 8; col++) {
      expect(component.board[6][col]?.type).toBe('P');
      expect(component.board[6][col]?.color).toBe('white');
    }

    // Check black pawns
    for (let col = 0; col < 8; col++) {
      expect(component.board[1][col]?.type).toBe('P');
      expect(component.board[1][col]?.color).toBe('black');
    }

    // Check white back row
    expect(component.board[7][0]?.type).toBe('R');
    expect(component.board[7][4]?.type).toBe('K');

    // Check black back row
    expect(component.board[0][0]?.type).toBe('R');
    expect(component.board[0][4]?.type).toBe('K');
  });

  it('should have white as starting player', () => {
    expect(component.currentPlayer).toBe('white');
  });

  it('should allow selecting a white piece on first turn', () => {
    component.onSquareClick(6, 4); // White pawn at e2
    expect(component.selectedSquare).toEqual({ row: 6, col: 4 });
    expect(component.validMoves.length).toBeGreaterThan(0);
  });

  it('should show valid pawn moves', () => {
    component.onSquareClick(6, 4); // White pawn at e2
    const validMoves = component.validMoves;
    // Pawn can move 1 or 2 squares forward
    expect(validMoves.some(m => m.row === 5 && m.col === 4)).toBeTruthy();
    expect(validMoves.some(m => m.row === 4 && m.col === 4)).toBeTruthy();
  });

  it('should move piece when valid move is selected', () => {
    component.onSquareClick(6, 4); // Select white pawn
    component.onSquareClick(4, 4); // Move two squares forward

    expect(component.board[4][4]?.type).toBe('P');
    expect(component.board[4][4]?.color).toBe('white');
    expect(component.board[6][4]).toBeNull();
  });

  it('should switch player after move', () => {
    expect(component.currentPlayer).toBe('white');
    component.onSquareClick(6, 4);
    component.onSquareClick(4, 4);
    expect(component.currentPlayer).toBe('black');
  });

  it('should reset game', () => {
    component.onSquareClick(6, 4);
    component.onSquareClick(4, 4);
    component.resetGame();

    expect(component.currentPlayer).toBe('white');
    expect(component.selectedSquare).toBeNull();
    expect(component.moveHistory.length).toBe(0);
    expect(component.board[6][4]?.type).toBe('P');
  });

  it('should get correct piece symbol', () => {
    const whitePawn = { type: 'P' as const, color: 'white' as const };
    const blackKing = { type: 'K' as const, color: 'black' as const };

    expect(component.getPieceSymbol(whitePawn)).toBe('♙');
    expect(component.getPieceSymbol(blackKing)).toBe('♚');
  });

  it('should determine square color correctly', () => {
    expect(component.getSquareColor(0, 0)).toBe('light');
    expect(component.getSquareColor(0, 1)).toBe('dark');
    expect(component.getSquareColor(1, 0)).toBe('dark');
    expect(component.getSquareColor(1, 1)).toBe('light');
  });

  it('should not allow selecting opponent pieces', () => {
    component.onSquareClick(1, 4); // Try to select black pawn as white
    expect(component.selectedSquare).toBeNull();
  });

  it('should record moves in history', () => {
    component.onSquareClick(6, 4);
    component.onSquareClick(4, 4);
    expect(component.moveHistory.length).toBe(1);
    expect(component.moveHistory[0]).toContain('e2');
  });
});
