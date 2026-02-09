import { Component } from '@angular/core';
import { Piece, Position, Color } from './chess.model';
import { ChessBoardService } from './chess-board.service';
import { ChessEngineService } from './chess-engine.service';

@Component({
  selector: 'app-chess',
  standalone: true,
  imports: [],
  templateUrl: './chess.html',
  styleUrl: './chess.scss',
})
export class ChessComponent {
  selectedSquare: Position | null = null;
  validMoves: Position[] = [];
  currentPlayer: Color = 'white';
  gameStatus: string = 'White\'s turn';
  moveHistory: string[] = [];

  constructor(
    public boardService: ChessBoardService,
    private engineService: ChessEngineService
  ) {}

  get board() {
    return this.boardService.getBoard();
  }

  onSquareClick(row: number, col: number): void {
    const clickedPos = { row, col };
    const piece = this.boardService.getPieceAt(clickedPos);

    // Try to move if a piece is already selected
    if (this.selectedSquare && this.engineService.isValidMove(this.selectedSquare, clickedPos)) {
      this.executeMove(this.selectedSquare, clickedPos);
      this.clearSelection();
      this.switchPlayer();
      return;
    }

    // Select new piece if it belongs to current player
    if (piece && piece.color === this.currentPlayer) {
      this.selectedSquare = clickedPos;
      this.validMoves = this.engineService.getValidMoves(clickedPos);
    } else {
      this.clearSelection();
    }
  }

  private executeMove(from: Position, to: Position): void {
    const piece = this.boardService.getPieceAt(from);
    const captured = this.boardService.movePiece(from, to);

    if (piece) {
      const notation = this.engineService.positionToNotation(from) +
                      (captured ? 'x' : '') +
                      this.engineService.positionToNotation(to);
      this.moveHistory.push(notation);
    }
  }

  private clearSelection(): void {
    this.selectedSquare = null;
    this.validMoves = [];
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    this.gameStatus = `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)}'s turn`;
  }

  resetGame(): void {
    this.boardService.reset();
    this.clearSelection();
    this.currentPlayer = 'white';
    this.gameStatus = 'White\'s turn';
    this.moveHistory = [];
  }

  getPieceSymbol(piece: Piece | null): string {
    return piece ? this.engineService.getPieceSymbol(piece) : '';
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedSquare !== null &&
           this.selectedSquare.row === row &&
           this.selectedSquare.col === col;
  }

  isValidMoveSquare(row: number, col: number): boolean {
    return this.validMoves.some(m => m.row === row && m.col === col);
  }

  getSquareColor(row: number, col: number): string {
    return (row + col) % 2 === 0 ? 'light' : 'dark';
  }
}
