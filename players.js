function Players(name, idPlayer, health, x, y, weapon, oldWeapon, dommages, defense) {
    this.name = name;
    this.idPlayer = idPlayer;
    this.health = health;
    this.x = x;
    this.y = y;
    this.weapon = weapon;
    this.oldWeapon = oldWeapon;
    this.dommages = dommages;
    this.defense = defense;

    // methodes déplacement

    this.PossibleMove = function () {
        for (i = 1; i <= 3; i++) {
            if (this.y - i >= 0) {
                if (board[this.x][this.y - i] == 0) {
                    board[this.x][this.y - i] = 100;
                }
                if (board[this.x][this.y - i] >= 300 || board[this.x][this.y - i] <= 9) {
                    break;
                }
                if (board[this.x][this.y - i] >= 10 && board[this.x][this.y - i] <= 99) {
                    board[this.x][this.y - i] = board[this.x][this.y - i] + 100;
                }
            }
        }
        for (i = -1; i >= -3; i--) {
            if (this.y - i < newBoard.columns) {
                if (board[this.x][this.y - i] == 0) {
                    board[this.x][this.y - i] = 100;
                }
                if (board[this.x][this.y - i] >= 300 || board[this.x][this.y - i] <= 9) {
                    break;
                }
                if (board[this.x][this.y - i] >= 10 && board[this.x][this.y - i] <= 99) {
                    board[this.x][this.y - i] = board[this.x][this.y - i] + 100;
                }
            }
        }

        for (i = 1; i <= 3; i++) {
            if (this.x - i >= 0) {
                if (board[this.x - i][this.y] == 0) {
                    board[this.x - i][this.y] = 100;
                }
                if (board[this.x - i][this.y] >= 300 || board[this.x - i][this.y] <= 9) {
                    break;
                }
                if (board[this.x - i][this.y] >= 10 && board[this.x - i][this.y] <= 99) {
                    board[this.x - i][this.y] = board[this.x - i][this.y] + 100;
                }
            }
        }
        for (i = -1; i >= -3; i--) {
            if (this.x - i < newBoard.rows) {
                if (board[this.x - i][this.y] == 0) {
                    board[this.x - i][this.y] = 100;
                }
                if (board[this.x - i][this.y] >= 300 || board[this.x - i][this.y] <= 9) {
                    break;
                }
                if (board[this.x - i][this.y] >= 10 && board[this.x - i][this.y] <= 99) {
                    board[this.x - i][this.y] = board[this.x - i][this.y] + 100;
                }
            }
        }
        draw();
    };

    //fiches joueurs Jquery

    this.playerSheet = function () {
        $(function () {
            $(".container").remove();
            for (i = 1; i <= playersQuantity; i++) {
                if (i % 2 == 0) {
                    $("#droite").append("<div class=\"container\" id=\"player" + players[i].idPlayer + "\"></div>");
                    currentPlayer.displayPlayerSheet(i);
                } else {
                    $("#gauche").append("<div class=\"container\" id=\"player" + players[i].idPlayer + "\"></div>");
                    currentPlayer.displayPlayerSheet(i);
                }
            }
        });
    };

    this.displayPlayerSheet = function (i) {
        $("#player" + players[i].idPlayer).append("<div class=\"fiche-joueur\" id=\"sheet" + players[i].idPlayer + "\"></div>");
        $("#sheet" + players[i].idPlayer).append("<h2>" + players[i].name + "</h2>").append("<div id=\"infos-et-image" + players[i].idPlayer + "\"class=\"infos-et-image\">");
        $("#infos-et-image" + players[i].idPlayer).append("<img src=\"images/perso/perso" + players[i].idPlayer + ".png\">").append("<div id=\"infos-perso" + players[i].idPlayer + "\" class=\"infos-perso\">");
        $("#infos-perso" + players[i].idPlayer).append("<p>Santé : " + players[i].health + "</p>").append("<p>Arme : " + players[i].weapon.name + "</p>").append("<p>Dégâts : " + players[i].dommages + "</p>");
    };

    this.displayCurrentPlayer = function () {
        var a = this.idPlayer;
        $(function () {
            $("#player" + a).css("filter", "drop-shadow(0 8px 16px rgba(0,0,0,0.2))")
            $("#sheet" + a).css("background-color", "#ff0").css("-webkit-animation", "jelly 4s ease-in-out infinite").css("animation", "jelly 4s ease-in-out infinite");
        });
    }

    // méthodes duel

    this.defend = function () {
        striker.defense = 1;
        striker.nextDuelTurn();
    };

    this.looseLife = function () {
        striker.defense = 0;
        if (defender.defense == 0) {
            defender.health = defender.health - striker.dommages;
            striker.attackResult();
        }
        if (defender.defense == 1) {
            defender.health = defender.health - (striker.dommages / 2);
            defender.defense = 0;
            striker.attackResult();
        };
    }

    this.attackResult = function () {
        if (defender.health <= 0) {
            defender.health = 0;
            if (players.length <= 3) {
                striker.winGame();
            } else {
                var a = players.indexOf(defender);
                players.splice(a, 1);
                playersQuantity = playersQuantity - 1;
                game.cleanBoard();
                striker.winDuel();
            }
        } else {
            striker.nextDuelTurn();
        }
    }
    
    this.nextDuelTurn = function () {
        striker = defender;
        defender = currentPlayer;
        currentPlayer = striker;
        game.duel();
    };

    this.winDuel = function () {
        board[defender.x][defender.y] = 0;
        striker.health = striker.health + 50;
        if (striker.health > 100) {
            striker.health = 100;
        }
        $("#duel-display").css("display", "none");
        $("canvas").css("display", "block");
        nextPlayer = whoIsNext();
        striker = null;
        defender = null;
        game.nextTurn();
    };

    this.winGame = function () {
        striker.playerSheet();
        $("#duel").remove();
        $("#duel-display").append("<div id=\"duel\"></div>");
        $("#duel").append("<img id=\"crown-img\" src=\"images/crown.png\" alt=\"Couronne\" href=\"https://www.freevector.com/free-cartoon-crown-vector--19892#\">");
        $("#duel").append("<h2>victoire royale<br>" + striker.name + "</h2>");
        $("#duel").append("<div id=\"buttons\"></div>");
        $("#buttons").append("<button id=\"retry\">Recommencer</button><button id=\"new-game\">Nouvelle partie</button>");
        striker.displayCurrentPlayer();
        endGameChoice();
    };
}