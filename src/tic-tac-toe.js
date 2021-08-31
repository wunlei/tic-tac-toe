class TicTacToe {
  constructor() {
    this.field = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.current = "x";
    this.turnNumber = 0;
  }

  getCurrentPlayerSymbol() {
    return this.current;
  }

  nextTurn(rowIndex, columnIndex) {
    if (!this.field[rowIndex][columnIndex]) {
      this.turnNumber += 1;
      this.field[rowIndex][columnIndex] = this.current;
      this.current = this.current === "x" ? "o" : "x";
    }
  }

  isFinished() {
    if (this.getWinner() || this.isDraw()) {
      return true;
    }
    return false;
  }

  getWinner() {
    let winner = null;

    function winRow(line, board) {
      for (let element of board) {
        if (element.every((el) => el === "x")) {
          line = true;
          winner = "x";
        } else if (element.every((el) => el === "o")) {
          line = true;
          winner = "o";
        }
      }
    }

    let row = false;
    winRow(row, this.field);

    let col = false;
    let rotate = [[], [], []];
    for (let element of rotate) {
      for (let i = 0; i < 3; i++) {
        element.push(this.field[i][rotate.indexOf(element)]);
      }
    }

    winRow(col, rotate);

    let diagonal = false;
    let cur = this.field[1][1];
    if (this.field[0][0] === cur && this.field[2][2] === cur) {
      diagonal = true;
      winner = cur;
    } else if (this.field[0][2] === cur && this.field[2][0] === cur) {
      diagonal = true;
      winner = cur;
    }
    return winner;
  }

  noMoreTurns() {
    for (let element of this.field) {
      if (element.includes(null)) {
        return false;
      }
    }
    return true;
  }

  isDraw() {
    if (!this.getWinner() && this.noMoreTurns()) {
      return true;
    }
    return false;
  }

  getFieldValue(rowIndex, colIndex) {
    return this.field[rowIndex][colIndex];
  }
}

module.exports = TicTacToe;
