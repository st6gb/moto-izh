export type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | null;
export type Color = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: Color;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  captured?: Piece;
}

export const BOARD_SIZE = 8;
export const EMPTY_BOARD = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
