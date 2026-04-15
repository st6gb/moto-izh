import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
  isActive: boolean;
}

interface BoardSquare {
  id: number;
  snakeTo?: number;
  ladderTo?: number;
}

@Component({
  selector: 'app-snakes-and-ladders',
  imports: [CommonModule],
  templateUrl: './snakes-and-ladders.html',
  styleUrl: './snakes-and-ladders.scss',
})
export class SnakesAndLaddersComponent implements OnInit {
  board: BoardSquare[] = [];
  players: Player[] = [];
  currentPlayerIndex: number = 0;
  diceValue: number | null = null;
  gameStarted: boolean = false;
  gameFinished: boolean = false;
  winner: Player | null = null;
  boardSize: number = 100;
  gridSize: number = 10;
  message: string = '';

  // Snakes and Ladders positions (start -> end)
  private snakes: [number, number][] = [
    [16, 6],
    [47, 26],
    [49, 11],
    [56, 53],
    [62, 19],
    [87, 24],
    [93, 73],
    [95, 75],
    [98, 79],
  ];

  private ladders: [number, number][] = [
    [2, 38],
    [7, 14],
    [8, 31],
    [21, 42],
    [28, 84],
    [51, 67],
    [72, 91],
    [80, 99],
  ];

  private diceRolls: number[] = [];

  ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = [];
    for (let i = 1; i <= this.boardSize; i++) {
      const square: BoardSquare = { id: i };
      const snake = this.snakes.find((s) => s[0] === i);
      const ladder = this.ladders.find((l) => l[0] === i);
      if (snake) square.snakeTo = snake[1];
      if (ladder) square.ladderTo = ladder[1];
      this.board.push(square);
    }
  }

  startGame(): void {
    if (this.players.length === 0) {
      this.message = 'Please add at least one player';
      return;
    }
    this.gameStarted = true;
    this.gameFinished = false;
    this.winner = null;
    this.currentPlayerIndex = 0;
    this.players.forEach((p) => (p.position = 1));
    this.updatePlayerStatus();
    this.message = `${this.players[0].name}'s turn`;
  }

  addPlayer(name: string): void {
    if (this.gameStarted) {
      this.message = 'Cannot add player during game';
      return;
    }
    if (!name.trim()) {
      this.message = 'Player name cannot be empty';
      return;
    }
    if (this.players.length >= 4) {
      this.message = 'Maximum 4 players allowed';
      return;
    }
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
    this.players.push({
      id: this.players.length + 1,
      name: name.trim(),
      position: 1,
      color: colors[this.players.length],
      isActive: false,
    });
    this.message = `Player ${name} added`;
  }

  rollDice(): void {
    if (!this.gameStarted || this.gameFinished) return;

    this.diceValue = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = this.players[this.currentPlayerIndex];
    let newPosition = currentPlayer.position + this.diceValue;

    // Check if player reached or passed 100
    if (newPosition > this.boardSize) {
      newPosition = this.boardSize - (newPosition - this.boardSize);
    }

    // Check for snake or ladder
    const square = this.board[newPosition - 1];
    if (square.snakeTo) {
      this.message = `${currentPlayer.name} rolled ${this.diceValue} and landed on a snake! Moving from ${newPosition} to ${square.snakeTo}`;
      newPosition = square.snakeTo;
    } else if (square.ladderTo) {
      this.message = `${currentPlayer.name} rolled ${this.diceValue} and found a ladder! Moving from ${newPosition} to ${square.ladderTo}`;
      newPosition = square.ladderTo;
    } else {
      this.message = `${currentPlayer.name} rolled ${this.diceValue} and moved to ${newPosition}`;
    }

    currentPlayer.position = newPosition;

    // Check if player won
    if (currentPlayer.position === this.boardSize) {
      this.gameFinished = true;
      this.winner = currentPlayer;
      this.message = `🎉 ${currentPlayer.name} won the game! 🎉`;
      return;
    }

    // Move to next player
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.updatePlayerStatus();
  }

  updatePlayerStatus(): void {
    this.players.forEach((p) => (p.isActive = false));
    this.players[this.currentPlayerIndex].isActive = true;
    if (!this.gameFinished) {
      this.message = `${this.players[this.currentPlayerIndex].name}'s turn`;
    }
  }

  resetGame(): void {
    this.gameStarted = false;
    this.gameFinished = false;
    this.winner = null;
    this.currentPlayerIndex = 0;
    this.diceValue = null;
    this.diceRolls = [];
    this.players = [];
    this.message = '';
  }

  removePlayer(playerId: number): void {
    if (this.gameStarted) {
      this.message = 'Cannot remove player during game';
      return;
    }
    this.players = this.players.filter((p) => p.id !== playerId);
  }

  getGridPosition(squareId: number): { row: number; col: number } {
    const row = Math.floor((squareId - 1) / this.gridSize);
    let col = (squareId - 1) % this.gridSize;

    // Reverse every odd row for snake-like pattern
    if (row % 2 === 1) {
      col = this.gridSize - 1 - col;
    }

    return { row, col };
  }

  getSortedBoard(): BoardSquare[] {
    return this.board.sort((a, b) => {
      const posA = this.getGridPosition(a.id);
      const posB = this.getGridPosition(b.id);
      if (posA.row !== posB.row) return posA.row - posB.row;
      return posA.col - posB.col;
    });
  }

  getPlayersOnSquare(squareId: number): Player[] {
    return this.players.filter((p) => p.position === squareId);
  }
}
