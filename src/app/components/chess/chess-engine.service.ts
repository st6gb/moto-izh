import { Injectable } from '@angular/core';
import { Piece, Position, Color, PieceType, BOARD_SIZE } from './chess.model';
import { ChessBoardService } from './chess-board.service';

@Injectable({ providedIn: 'root' })
export class ChessEngineService {
  constructor(private boardService: ChessBoardService) {}

  getValidMoves(pos: Position): Position[] {
    const piece = this.boardService.getPieceAt(pos);
    if (!piece) return [];

    let moves: Position[] = [];

    switch (piece.type) {
      case 'P':
        moves = this.getPawnMoves(pos, piece.color);
        break;
      case 'R':
        moves = this.getRookMoves(pos, piece.color);
        break;
      case 'N':
        moves = this.getKnightMoves(pos, piece.color);
        break;
      case 'B':
        moves = this.getBishopMoves(pos, piece.color);
        break;
      case 'Q':
        moves = this.getQueenMoves(pos, piece.color);
        break;
      case 'K':
        moves = this.getKingMoves(pos, piece.color);
        break;
    }

    return moves;
  }

  private getPawnMoves(pos: Position, color: Color): Position[] {
    const moves: Position[] = [];
    const direction = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? 6 : 1;

    // Forward move
    const forwardRow = pos.row + direction;
    if (this.boardService.isInBounds({ row: forwardRow, col: pos.col }) &&
        !this.boardService.getPieceAt({ row: forwardRow, col: pos.col })) {
      moves.push({ row: forwardRow, col: pos.col });

      // Double move from start
      if (pos.row === startRow) {
        const doubleRow = pos.row + 2 * direction;
        if (!this.boardService.getPieceAt({ row: doubleRow, col: pos.col })) {
          moves.push({ row: doubleRow, col: pos.col });
        }
      }
    }

    // Diagonal captures
    for (let colOffset of [-1, 1]) {
      const capturePos = { row: forwardRow, col: pos.col + colOffset };
      if (this.boardService.isInBounds(capturePos) &&
          this.boardService.isOpponentPiece(capturePos, color)) {
        moves.push(capturePos);
      }
    }

    return moves;
  }

  private getRookMoves(pos: Position, color: Color): Position[] {
    return this.getSlidingMoves(pos, color, [[0, 1], [0, -1], [1, 0], [-1, 0]]);
  }

  private getBishopMoves(pos: Position, color: Color): Position[] {
    return this.getSlidingMoves(pos, color, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
  }

  private getQueenMoves(pos: Position, color: Color): Position[] {
    return this.getSlidingMoves(pos, color, [
      [0, 1], [0, -1], [1, 0], [-1, 0],
      [1, 1], [1, -1], [-1, 1], [-1, -1],
    ]);
  }

  private getSlidingMoves(pos: Position, color: Color, directions: [number, number][]): Position[] {
    const moves: Position[] = [];

    for (const [dr, dc] of directions) {
      for (let i = 1; i < BOARD_SIZE; i++) {
        const newPos = { row: pos.row + dr * i, col: pos.col + dc * i };
        if (!this.boardService.isInBounds(newPos)) break;

        const targetPiece = this.boardService.getPieceAt(newPos);
        if (targetPiece) {
          if (this.boardService.isOpponentPiece(newPos, color)) {
            moves.push(newPos);
          }
          break;
        }

        moves.push(newPos);
      }
    }

    return moves;
  }

  private getKnightMoves(pos: Position, color: Color): Position[] {
    const moves: Position[] = [];
    const offsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1],
    ];

    for (const [dr, dc] of offsets) {
      const newPos = { row: pos.row + dr, col: pos.col + dc };
      if (this.boardService.isInBounds(newPos) &&
          !this.boardService.isOwnPiece(newPos, color)) {
        moves.push(newPos);
      }
    }

    return moves;
  }

  private getKingMoves(pos: Position, color: Color): Position[] {
    const moves: Position[] = [];

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;

        const newPos = { row: pos.row + dr, col: pos.col + dc };
        if (this.boardService.isInBounds(newPos) &&
            !this.boardService.isOwnPiece(newPos, color)) {
          moves.push(newPos);
        }
      }
    }

    return moves;
  }

  positionToNotation(pos: Position): string {
    return String.fromCharCode(97 + pos.col) + (8 - pos.row);
  }

  getPieceSymbol(piece: Piece): string {
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

  isValidMove(from: Position, to: Position): boolean {
    return this.getValidMoves(from).some(m => m.row === to.row && m.col === to.col);
  }
}
