import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | null;
type Color = 'white' | 'black';

interface Piece {
  type: PieceType;
  color: Color;
}

interface Position {
  row: number;
  col: number;
}

@Component({
  selector: 'app-chess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chess.html',
  styleUrl: './chess.scss',
})
export class ChessComponent {
  board: (Piece | null)[][] = [];
  selectedSquare: Position | null = null;
  validMoves: Position[] = [];
  currentPlayer: Color = 'white';
  gameStatus: string = 'White\'s turn';
  moveHistory: string[] = [];
  checkStatus: string = '';

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard(): void {
    this.board = Array(8).fill(null).map(() => Array(8).fill(null));

    // Set up pawns
    for (let col = 0; col < 8; col++) {
      this.board[1][col] = { type: 'P', color: 'black' };
      this.board[6][col] = { type: 'P', color: 'white' };
    }

    // Set up back rows
    const backRow = [
      { type: 'R' as PieceType, color: 'white' as Color },
      { type: 'N' as PieceType, color: 'white' as Color },
      { type: 'B' as PieceType, color: 'white' as Color },
      { type: 'Q' as PieceType, color: 'white' as Color },
      { type: 'K' as PieceType, color: 'white' as Color },
      { type: 'B' as PieceType, color: 'white' as Color },
      { type: 'N' as PieceType, color: 'white' as Color },
      { type: 'R' as PieceType, color: 'white' as Color },
    ];

    for (let col = 0; col < 8; col++) {
      this.board[7][col] = backRow[col];
      this.board[0][col] = { ...backRow[col], color: 'black' };
    }
  }

  onSquareClick(row: number, col: number): void {
    const piece = this.board[row][col];

    if (this.selectedSquare && this.isValidMove(this.selectedSquare, { row, col })) {
      this.movePiece(this.selectedSquare, { row, col });
      this.selectedSquare = null;
      this.validMoves = [];
      this.switchPlayer();
      return;
    }

    if (piece && piece.color === this.currentPlayer) {
      this.selectedSquare = { row, col };
      this.validMoves = this.getValidMoves({ row, col });
    } else {
      this.selectedSquare = null;
      this.validMoves = [];
    }
  }

  private getValidMoves(pos: Position): Position[] {
    const piece = this.board[pos.row][pos.col];
    if (!piece) return [];

    let moves: Position[] = [];

    switch (piece.type) {
      case 'P':
        moves = this.getPawnMoves(pos, piece.color);
        break;
      case 'R':
        moves = this.getRookMoves(pos);
        break;
      case 'N':
        moves = this.getKnightMoves(pos);
        break;
      case 'B':
        moves = this.getBishopMoves(pos);
        break;
      case 'Q':
        moves = this.getQueenMoves(pos);
        break;
      case 'K':
        moves = this.getKingMoves(pos);
        break;
    }

    return moves.filter(move => this.isInBounds(move) && !this.isOwnPiece(move, piece.color));
  }

  private getPawnMoves(pos: Position, color: Color): Position[] {
    const moves: Position[] = [];
    const direction = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? 6 : 1;

    // Forward move
    const forwardRow = pos.row + direction;
    if (this.isInBounds({ row: forwardRow, col: pos.col }) && !this.board[forwardRow][pos.col]) {
      moves.push({ row: forwardRow, col: pos.col });

      // Double move from start
      if (pos.row === startRow) {
        const doubleForwardRow = pos.row + 2 * direction;
        if (!this.board[doubleForwardRow][pos.col]) {
          moves.push({ row: doubleForwardRow, col: pos.col });
        }
      }
    }

    // Diagonal captures
    for (let colOffset of [-1, 1]) {
      const newPos = { row: forwardRow, col: pos.col + colOffset };
      if (this.isInBounds(newPos) && this.board[newPos.row][newPos.col]) {
        const targetPiece = this.board[newPos.row][newPos.col];
        if (targetPiece && targetPiece.color !== color) {
          moves.push(newPos);
        }
      }
    }

    return moves;
  }

  private getRookMoves(pos: Position): Position[] {
    const moves: Position[] = [];
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (const [dr, dc] of directions) {
      for (let i = 1; i < 8; i++) {
        const newPos = { row: pos.row + dr * i, col: pos.col + dc * i };
        if (!this.isInBounds(newPos)) break;
        if (this.board[newPos.row][newPos.col]) {
          if (this.board[newPos.row][newPos.col]!.color !== this.board[pos.row][pos.col]!.color) {
            moves.push(newPos);
          }
          break;
        }
        moves.push(newPos);
      }
    }

    return moves;
  }

  private getKnightMoves(pos: Position): Position[] {
    const moves: Position[] = [];
    const offsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1],
    ];

    for (const [dr, dc] of offsets) {
      const newPos = { row: pos.row + dr, col: pos.col + dc };
      if (this.isInBounds(newPos)) {
        moves.push(newPos);
      }
    }

    return moves;
  }

  private getBishopMoves(pos: Position): Position[] {
    const moves: Position[] = [];
    const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (const [dr, dc] of directions) {
      for (let i = 1; i < 8; i++) {
        const newPos = { row: pos.row + dr * i, col: pos.col + dc * i };
        if (!this.isInBounds(newPos)) break;
        if (this.board[newPos.row][newPos.col]) {
          if (this.board[newPos.row][newPos.col]!.color !== this.board[pos.row][pos.col]!.color) {
            moves.push(newPos);
          }
          break;
        }
        moves.push(newPos);
      }
    }

    return moves;
  }

  private getQueenMoves(pos: Position): Position[] {
    return [...this.getRookMoves(pos), ...this.getBishopMoves(pos)];
  }

  private getKingMoves(pos: Position): Position[] {
    const moves: Position[] = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const newPos = { row: pos.row + dr, col: pos.col + dc };
        if (this.isInBounds(newPos)) {
          moves.push(newPos);
        }
      }
    }
    return moves;
  }

  private isValidMove(from: Position, to: Position): boolean {
    return this.getValidMoves(from).some(move => move.row === to.row && move.col === to.col);
  }

  private isOwnPiece(pos: Position, color: Color): boolean {
    const piece = this.board[pos.row][pos.col];
    return piece !== null && piece.color === color;
  }

  private isInBounds(pos: Position): boolean {
    return pos.row >= 0 && pos.row <= 7 && pos.col >= 0 && pos.col <= 7;
  }

  private movePiece(from: Position, to: Position): void {
    const piece = this.board[from.row][from.col];
    const captured = this.board[to.row][to.col];

    this.board[to.row][to.col] = piece;
    this.board[from.row][from.col] = null;

    const pieceName = this.getPieceName(piece?.type || null);
    const fromNotation = this.positionToNotation(from);
    const toNotation = this.positionToNotation(to);
    const captureStr = captured ? 'x' : '';

    this.moveHistory.push(`${pieceName}${fromNotation}${captureStr}${toNotation}`);
  }

  private getPieceName(type: PieceType): string {
    if (type === null) return '';
    const names: Record<Exclude<PieceType, null>, string> = {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '',
    };
    return names[type] || '';
  }

  private positionToNotation(pos: Position): string {
    return String.fromCharCode(97 + pos.col) + (8 - pos.row);
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    this.gameStatus = `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)}'s turn`;
    this.checkStatus = '';
  }

  resetGame(): void {
    this.board = [];
    this.selectedSquare = null;
    this.validMoves = [];
    this.currentPlayer = 'white';
    this.gameStatus = 'White\'s turn';
    this.moveHistory = [];
    this.checkStatus = '';
    this.initializeBoard();
  }

  getPieceSymbol(piece: Piece | null): string {
    if (!piece || piece.type === null) return '';
    const symbols: Record<Exclude<PieceType, null>, Record<Color, string>> = {
      'K': { white: '♔', black: '♚' },
      'Q': { white: '♕', black: '♛' },
      'R': { white: '♖', black: '♜' },
      'B': { white: '♗', black: '♝' },
      'N': { white: '♘', black: '♞' },
      'P': { white: '♙', black: '♟' },
    };
    return symbols[piece.type][piece.color] || '';
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedSquare !== null &&
           this.selectedSquare.row === row &&
           this.selectedSquare.col === col;
  }

  isValidMoveSquare(row: number, col: number): boolean {
    return this.validMoves.some(move => move.row === row && move.col === col);
  }

  getSquareColor(row: number, col: number): string {
    return (row + col) % 2 === 0 ? 'light' : 'dark';
  }
}
