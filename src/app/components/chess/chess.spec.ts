import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChessComponent } from './chess';
import { ChessBoardService } from './chess-board.service';
import { ChessEngineService } from './chess-engine.service';

describe('ChessComponent', () => {
  let component: ChessComponent;
  let fixture: ComponentFixture<ChessComponent>;
  let boardService: ChessBoardService;
  let engineService: ChessEngineService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessComponent],
      providers: [ChessBoardService, ChessEngineService],
    }).compileComponents();

    fixture = TestBed.createComponent(ChessComponent);
    component = fixture.componentInstance;
    boardService = TestBed.inject(ChessBoardService);
    engineService = TestBed.inject(ChessEngineService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize board correctly', () => {
    const board = boardService.getBoard();

    // Check pawns
    expect(board[6][0]?.type).toBe('P');
    expect(board[6][0]?.color).toBe('white');
    expect(board[1][0]?.type).toBe('P');
    expect(board[1][0]?.color).toBe('black');

    // Check back row
    expect(board[7][0]?.type).toBe('R');
    expect(board[7][4]?.type).toBe('K');
  });

  it('should have white as starting player', () => {
    expect(component.currentPlayer).toBe('white');
  });

  it('should show valid pawn moves', () => {
    const moves = engineService.getValidMoves({ row: 6, col: 4 });
    expect(moves.length).toBeGreaterThan(0);
    expect(moves.some(m => m.row === 5 && m.col === 4)).toBeTruthy();
  });

  it('should allow selecting own piece', () => {
    component.onSquareClick(6, 4);
    expect(component.selectedSquare).toEqual({ row: 6, col: 4 });
    expect(component.validMoves.length).toBeGreaterThan(0);
  });

  it('should move piece on valid move', () => {
    component.onSquareClick(6, 4); // Select pawn
    component.onSquareClick(4, 4); // Move forward

    const piece = boardService.getPieceAt({ row: 4, col: 4 });
    expect(piece?.type).toBe('P');
    expect(piece?.color).toBe('white');
  });

  it('should switch player after move', () => {
    expect(component.currentPlayer).toBe('white');
    component.onSquareClick(6, 4);
    component.onSquareClick(4, 4);
    expect(component.currentPlayer).toBe('black');
  });

  it('should record moves in history', () => {
    component.onSquareClick(6, 4);
    component.onSquareClick(4, 4);
    expect(component.moveHistory.length).toBe(1);
  });

  it('should reset game', () => {
    component.onSquareClick(6, 4);
    component.onSquareClick(4, 4);
    component.resetGame();

    expect(component.currentPlayer).toBe('white');
    expect(component.moveHistory.length).toBe(0);
    expect(boardService.getPieceAt({ row: 6, col: 4 })?.type).toBe('P');
  });

  it('should get correct piece symbol', () => {
    const whitePawn = { type: 'P' as const, color: 'white' as const };
    expect(engineService.getPieceSymbol(whitePawn)).toBe('♙');
  });

  it('should validate square colors', () => {
    expect(component.getSquareColor(0, 0)).toBe('light');
    expect(component.getSquareColor(0, 1)).toBe('dark');
  });

  it('should not select opponent piece', () => {
    component.onSquareClick(1, 0); // Try black pawn as white
    expect(component.selectedSquare).toBeNull();
  });
});
