import { Injectable } from '@angular/core';
import { Piece, Position, PieceType, Color, BOARD_SIZE, EMPTY_BOARD } from './chess.model';

@Injectable({ providedIn: 'root' })
export class ChessBoardService {
  private board: (Piece | null)[][] = [];

  constructor() {
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = EMPTY_BOARD.map(row => [...row]);

    // Set up pawns
    for (let col = 0; col < BOARD_SIZE; col++) {
      this.board[1][col] = { type: 'P', color: 'black' };
      this.board[6][col] = { type: 'P', color: 'white' };
    }

    // Set up back rows
    const backRow: Piece[] = [
      { type: 'R', color: 'white' },
      { type: 'N', color: 'white' },
      { type: 'B', color: 'white' },
      { type: 'Q', color: 'white' },
      { type: 'K', color: 'white' },
      { type: 'B', color: 'white' },
      { type: 'N', color: 'white' },
      { type: 'R', color: 'white' },
    ];

    for (let col = 0; col < BOARD_SIZE; col++) {
      this.board[7][col] = { ...backRow[col] };
      this.board[0][col] = { ...backRow[col], color: 'black' };
    }
  }

  getBoard(): (Piece | null)[][] {
    return this.board;
  }

  getPieceAt(pos: Position): Piece | null {
    return this.isInBounds(pos) ? this.board[pos.row][pos.col] : null;
  }

  setPiece(pos: Position, piece: Piece | null): void {
    if (this.isInBounds(pos)) {
      this.board[pos.row][pos.col] = piece;
    }
  }

  movePiece(from: Position, to: Position): Piece | null {
    const piece = this.getPieceAt(from);
    const captured = this.getPieceAt(to);

    if (piece) {
      this.setPiece(to, piece);
      this.setPiece(from, null);
    }

    return captured;
  }

  isInBounds(pos: Position): boolean {
    return pos.row >= 0 && pos.row < BOARD_SIZE && pos.col >= 0 && pos.col < BOARD_SIZE;
  }

  isOwnPiece(pos: Position, color: Color): boolean {
    const piece = this.getPieceAt(pos);
    return piece !== null && piece.color === color;
  }

  isOpponentPiece(pos: Position, color: Color): boolean {
    const piece = this.getPieceAt(pos);
    return piece !== null && piece.color !== color;
  }

  reset(): void {
    this.initializeBoard();
  }
}
