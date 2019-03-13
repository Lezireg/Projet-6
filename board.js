function boardConstructor(rows, columns, defaultBoardValue) {
    this.rows = rows;
    this.columns = columns;
    this.defaultBoardValue = defaultBoardValue;

    this.createBoard = function () {
        board = []
        for (x = 0; x < this.rows; x++) {
            board.push([]);
            board[x].push(new Array(this.columns));
            this.rows[x] = 0;
            for (y = 0; y < this.columns; y++) {
                board[x][y] = this.defaultBoardValue;
            }
        }
        return board;
    };

    this.putObjects = function () {
        for (i = 0; i < objectsOnBoard.length; i++) {
            var a = getEvenNumber(possibleCells.length);
            var b = a + 1;
            var c = possibleCells[a];
            var d = possibleCells[b];
            if (objectsOnBoard[i] >= 1 && objectsOnBoard[i] <= 9) {
                 var positionOk = false;
                while (!positionOk) {
                    positionOk = this.dontPutPlayersNearEachOthers(c, d);
                    if (positionOk == true) {
                        board[c][d] = objectsOnBoard[i];
                        possibleCells.splice(a, 2);
                        players[i + 1].x = c;
                        players[i + 1].y = d;
                        newBoard.impossiblePlayerCell(i)
                    } else {
                        a = getEvenNumber(possibleCells.length);
                        b = a + 1;
                        c = possibleCells[a];
                        d = possibleCells[b];
                    }
                }
            } else {
                this.putOtherThings(a, c, d);
            }
        }
        game.cleanBoard();
    };

    this.putOtherThings = function (a, c, d) {
        board[c][d] = objectsOnBoard[i];
        possibleCells.splice(a, 2);
    };

    this.dontPutPlayersNearEachOthers = function (c, d) {
        if (board[c][d] == 0) {
            return true;
        } else {
            return false;
        }
    };

    this.impossiblePlayerCell = function (i) {
        if (players[i + 1].x - 1 >= 0) {
            board[players[i + 1].x - 1][players[i + 1].y] = 350;
        } if (players[i + 1].x + 1 < newBoard.rows) {
            board[players[i + 1].x + 1][players[i + 1].y] = 350;
        } if (players[i + 1].y - 1 >= 0) {
            board[players[i + 1].x][players[i + 1].y - 1] = 350;
        } if (players[i + 1].y + 1 < newBoard.columns) {
            board[players[i + 1].x][players[i + 1].y + 1] = 350;
        }
    };
}