// lancement déplacement 
function game() {

    this.startTurn = function () {
        if (currentPlayer.weapon.idWeapon != currentPlayer.oldWeapon.idWeapon) {
            game.releaseOldWeapon();
        }
        if (board[a][b] == 100) {
            game.moveOnEmptyCase();
        }
        if (board[a][b] >= 110 && board[a][b] <= 199) {
            game.moveOnWeaponCase();
        }
        if (board[a][b] == 0 || board[a][b] == 300 || board[a][b] == 301) {
            game.infoPlayer();
        }
    };

    // transforme coordonnées du canvas en coordonnées du plateau
    this.pixelToArray = function (cy, cx) {
        a = Math.floor((cy - topHeight) / 50);
        b = Math.floor((cx - ((($(window).width()) - boardWidth) / 2)) / 50);
    };

    this.infoPlayer = function () {
        leftWidth = ($(window).width() - 500) / 2;
        $("#info-player").css("left", leftWidth);
        $("#info-player").css("top", topHeight);
        $("#info-player").slideDown(400).delay(1500).slideUp(400);
    }

    this.moveOnEmptyCase = function () {
        currentPlayer.x = a;
        currentPlayer.y = b;
        game.deleteOldCoords();
        game.cleanBoard();
        board[a][b] = currentPlayer.idPlayer;
        draw();
        setTimeout(function () {
            game.checkDuel()
        }, 100);
    };

    this.moveOnWeaponCase = function () {
        currentPlayer.x = a;
        currentPlayer.y = b;
        var idToIndex = (board[a][b] - 110);
        currentPlayer.dommages = weapons[idToIndex].dommages;
        currentPlayer.weapon = weapons[idToIndex];
        game.deleteOldCoords();
        game.cleanBoard();
        board[a][b] = currentPlayer.idPlayer;
        draw();
        setTimeout(function () {
            game.checkDuel()
        }, 100);

    };

    this.releaseOldWeapon = function () {
        board[currentPlayer.x][currentPlayer.y] = currentPlayer.oldWeapon.idWeapon;
        currentPlayer.oldWeapon = currentPlayer.weapon;
        if (board[a][b] == 100) {
            game.moveOnEmptyCase();
        }
        if (board[a][b] >= 110 && board[a][b] <= 199) {
            game.moveOnWeaponCase();
        }
    };

    // supprime les anciennes coordonnées du joueur qui se déplace
    this.deleteOldCoords = function () {
        for (y = 0; y < newBoard.columns; y++) {
            for (x = 0; x < newBoard.rows; x++) {
                if (board[x][y] == currentPlayer.idPlayer) {
                    board[x][y] = 0;
                }
            }
        }
    };

    this.cleanBoard = function () {
        for (y = 0; y < newBoard.columns; y++) {
            for (x = 0; x < newBoard.rows; x++) {
                if (board[x][y] == 100 || board[x][y] == 350) {
                    board[x][y] = 0;
                }
                if (board[x][y] >= 110 && board[x][y] < 200) {
                    board[x][y] = board[x][y] - 100;
                }
            }
        }
    };


    // Vérifie si des joueurs sont à coté suite au déplacement 
    this.checkDuel = function () {
        if (currentPlayer.x - 1 >= 0 && board[currentPlayer.x - 1][currentPlayer.y] >= 1 && board[currentPlayer.x - 1][currentPlayer.y] <= 9) {
            game.duel();
        }
        if (currentPlayer.x + 1 < newBoard.columns && board[currentPlayer.x + 1][currentPlayer.y] >= 1 && board[currentPlayer.x + 1][currentPlayer.y] <= 9) {
            game.duel();
        }
        if (currentPlayer.y - 1 >= 0 && board[currentPlayer.x][currentPlayer.y - 1] >= 1 && board[currentPlayer.x][currentPlayer.y - 1] <= 9) {
            game.duel();
        }
        if (currentPlayer.y + 1 < newBoard.rows && board[currentPlayer.x][currentPlayer.y + 1] >= 1 && board[currentPlayer.x][currentPlayer.y + 1] <= 9) {
            game.duel();
        } else {
            game.nextTurn();
        }
    };

    this.nextTurn = function () {
        currentPlayer.playerSheet();
        currentPlayer = nextPlayer;
        nextPlayer = whoIsNext();
        currentPlayer.PossibleMove();
        currentPlayer.displayCurrentPlayer();
        draw();
    };

    // duel
    this.duel = function () {
        striker = currentPlayer;
        defender = whoIsUnderAttack();
        $(function () {
            $("#duel-display").css("display", "block");
            $("canvas").css("display", "none");
            defender.playerSheet();
            striker.displayCurrentPlayer();
            $("#duel").remove();
            $("#duel-display").append("<div id=\"duel\"></div>")
            $("#duel").append("<h2 id=\"duel-title\">Duel</h2>")
            $("#duel").append("<div id=\"players-name\"></div>")
            $("#players-name").append("<div><h3>" + striker.name + "</h3></div><div><h3><i class=\"fas fa-bolt\"></i></h3></div><div><h3>" + defender.name + "</h3></div>")
            if (defender.defense == 0) {
                $("#duel").append("<p>" + striker.name + ", " + defender.name + " n'est pas en position de défense. </br>Souhaitez vous : <p>")
            } else {
                $("#duel").append("<p>" + striker.name + ", " + defender.name + " est en position de défense. </br>Souhaitez vous : <p>")
            }
            $("#duel").append("<div id=\"buttons\"></div>")
            $("#buttons").append("<button id=\"attack\">Attaquer</button><button id=\"defend\">Défendre</button>");
            game.attackOrDefense();
        });
    };

    this.attackOrDefense = function () {
        $(function () {
            $("#attack").on("click", striker.looseLife);
            $("#defend").on("click", striker.defend);
        });
    };
}