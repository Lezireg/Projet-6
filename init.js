/******* Initialisation ******/

/* Pour infos :
valeurs dans le tableau : 
- de 1 à 8 = Joueurs
- de 10 à 99 = armes
- 300 = obtacles
- 100 = cases vides disponibles pour les déplacements
- de 110 à 199 = cases avec armes disponibles pour déplacement 
- 350 = cases ou le placement d'un nouveau joueur est impossible (utilisé dans le placement des joueurs à l'initialisation)
*/

/*** Paramètres ***/

// Paramètres du plateau
var rows = null;;
var columns = null;
var defaultBoardValues = 0;
var obstaclesQuantity = 15;
var playersQuantity = 2 // de 3 à 8
var playersQuantityHistory = 2;
var weaponsQuantity = 4; // de 4 à 99

// variables globales
var board = null;
var randomPlayer = null;
var currentPlayer = null;
var nextPlayer = null;
var striker = null;
var defender = null;

// liste des armes
var handGun = new Weapons("pistolet", 10, 10, 0);
var rifle = new Weapons("fusil d'assaut", 11, 20, 0);
var shotgun = new Weapons("fusil à pompe", 12, 25, 0);
var rocketLaucher = new Weapons("lance-roquette", 13, 30, 0);
var magnum = new Weapons("magnum", 14, 15, 0)

// Emplacement plateau 
boardHeight = null;
boardWidth = null;
leftWidth = ($(window).width() - 500) / 2;
topHeight = 210;

/*** Tableaux ***/
// tabelau des joueurs fixes
var playersList = ["blank"];

// tableau des joueurs à jour
var players = ["blank"];

// tableau nom des joueurs
var playersNames = ["blank", "Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4", "Joueur 5", "Joueur 6", "Joueur 7", "Joueur 8"];

// tableau des armes 
var weapons = [handGun, rifle, shotgun, rocketLaucher, magnum];

// tableau des éléments à placer
var objectsOnBoard = [];

// tableau cases disponibles
var possibleCells = [];


/*** Création des objets ***/

// création de l'objet jeu

var game = new game();

function createGame() {

    // Paramètres du plateau 
    boardParameter();

    // Création du plateau
    newBoard = new boardConstructor(rows, columns, defaultBoardValues)
    board = newBoard.createBoard();

    /*** Remplissage du plateau ***/

    // création joueurs et insertion dans le tableau des joueurs et des objets
    for (i = 1; i <= playersQuantity; i++) {
        players[i] = new Players(playersNames[i], i, 100, 0, 0, weapons[0], weapons[0], weapons[0].dommages, 0, 1);
        playersList[i] = players[i];
        objectsOnBoard.push(players[i].idPlayer);
    }

    // insertion des armes dans le tableau des objets
    for (i = 1; i < weapons.length; i++) {
        objectsOnBoard.push(weapons[i].idWeapon);
    }

    // insertion des obstacles dans le tableau des objets
    for (i = 1; i <= obstaclesQuantity; i++) {
        var j = getRandomIntCeil(2);
        if (j == 1) {
            objectsOnBoard.push(300);
        }
        if (j == 2) {
            objectsOnBoard.push(301)
        }
    }

    // remplissage tableau des cases possibles
    for (x = 0; x < this.rows; x++) {
        for (y = 0; y < this.columns; y++) {
            if (board[x][y] == 0) {
                possibleCells.push(x);
                possibleCells.push(y);
            }
        }
    }

    // placement des objets sur le plateau
    newBoard.putObjects();


    /*** Affichage du plateau de jeu ***/
    draw();

    /*** Lancement Jeu ***/

    // selection premier joueur
    randomPlayer = getRandomIntCeil(playersQuantity);
    currentPlayer = players[randomPlayer]
    nextPlayer = whoIsNext();

    // Affiche les déplacements possible + surbrillance fiche joueur pour le premier tour
    currentPlayer.playerSheet();
    currentPlayer.displayCurrentPlayer();
    currentPlayer.PossibleMove();
    
}

// ecoute du clic
canvas.addEventListener("mousedown", atClick, false);

function atClick(event) {
    cx = event.pageX;
    cy = event.pageY;
    game.pixelToArray(cy, cx)
    game.startTurn();
}
//Limite d'affichage
$(window).on('resize', function(){
    var win = $(this); //this = window
    if (win.width() <= 1230) {
        $("main").css("display", "none");
        $(".alert-message").css("display", "block");
    }
    if (win.width() >= 1230) {
        $("main").css("display", "block");
        $(".alert-message").css("display", "none");
    }
});

// bouton menu latéral
$("#reload-btn").click(function () {
    reload();
});
$("#retry-btn").on("click", function () {
    restart();
});


/******* Interface début et fin de partie **********/

// Début de partie
$(function () {
    $(".add-button").on("click", function () {
        playersQuantity = playersQuantity + 1;
        if (playersQuantity >= 8) {
            $("#add-button-container").css("display", "none");
            $("#add-button-container").before("<div class=\"player-name\" id=\"player-add" + playersQuantity + "\"><form><input id =\"player-name" + playersQuantity + "\" value =\"Joueur " + playersQuantity + "\" type=\"text\" maxlength=\"10\"></form></div>");
            playersQuantity = 8;
            playersQuantityHistory = playersQuantity;
        } else {
            $("#add-button-container").before("<div class=\"player-name\" id=\"player-add" + playersQuantity + "\"><form><input id =\"player-name" + playersQuantity + "\" value =\"Joueur " + playersQuantity + "\" type=\"text\" maxlength=\"10\"></form></div>");
            $("#player-add" + playersQuantity).hide();
            $("#player-add" + playersQuantity).fadeIn(1000);
            playersQuantityHistory = playersQuantity;
        }
    });
    $("#start").on("click", function () {
        $(".homepage").css("display", "none");
        $(".jeu").css("display", "flex");
        $(".short-menu").css("display", "flex");
        for (i = 1; i <= playersQuantity; i++) {
            var name = $("#player-name" + i).val();
            playersNames[i] = name;
        }
        createGame();
    });
});

// choix fin de partie 

function endGameChoice() {
    $("#new-game").click(function () {
        reload();
    });
    $("#retry").on("click", function () {
        restart();
    });
}


/****** Fonctions usuelles ******/

//obtention chiffre aléatoire

function getRandomInt(number) {
    return Math.floor(Math.random() * Math.floor(number));
}

function getRandomIntCeil(number) {
    return Math.ceil(Math.random() * Math.ceil(number));
}

// obtention nombre pair 
function getEvenNumber(number) {
    var a = getRandomInt(number);
    if (a % 2 == 0) {
        return a;
    } else {
        return a - 1;
    }
}

// Paramètre de la page 

function boardParameter() {
    if (playersQuantity >= 6) {
        obstaclesQuantity = 24;
        rows = 12;
        columns = 12;
        boardHeight = rows * 50;
        boardWidth = columns * 50;
        $("#canvas").attr("width", boardWidth);
        $("#canvas").attr("height", boardHeight);
    } else {
        obstaclesQuantity = 15;
        rows = 10;
        columns = 10;
        boardHeight = rows * 50;
        boardWidth = columns * 50;
        $("#canvas").attr("width", boardWidth);
        $("#canvas").attr("height", boardHeight);
    }
}
// Recommencer
function restart() {
    newBoard = null;
    board = null;
    randomPlayer = null;
    currentPlayer = null;
    nextPlayer = null;
    striker = null;
    defender = null;
    playersQuantity = playersQuantityHistory;
    objectsOnBoard = [];
    possibleCells = [];
    $("#duel-display").css("display", "none");
    $("canvas").css("display", "block");
    createGame();
}
//Reload
function reload() {
    location.reload();
}
// function joueurs en cours

function whoIsNext() {
    index = players.indexOf(currentPlayer);
    if (index >= 1 && index < players.length - 1) {
        next = players[index + 1]
        return next;
    } else {
        var next = players[1];
        return next;
    }
}

function whoIsUnderAttack() {
    if (currentPlayer.x - 1 >= 0 && board[currentPlayer.x - 1][currentPlayer.y] >= 1 && board[currentPlayer.x - 1][currentPlayer.y] <= 9) {
        var z = board[currentPlayer.x - 1][currentPlayer.y];
        var playerIndex = playersList[z];
        getPlayer = players.indexOf(playerIndex);
        return players[getPlayer];
    }
    if (currentPlayer.x + 1 < newBoard.rows && board[currentPlayer.x + 1][currentPlayer.y] >= 1 && board[currentPlayer.x + 1][currentPlayer.y] <= 9) {
        var z = board[currentPlayer.x + 1][currentPlayer.y];
        var playerIndex = playersList[z];
        getPlayer = players.indexOf(playerIndex);
        return players[getPlayer];
    }
    if (currentPlayer.y - 1 >= 0 && board[currentPlayer.x][currentPlayer.y - 1] >= 1 && board[currentPlayer.x][currentPlayer.y - 1] <= 9) {
        var z = board[currentPlayer.x][currentPlayer.y - 1];
        var playerIndex = playersList[z];
        getPlayer = players.indexOf(playerIndex);
        return players[getPlayer];
    }
    if (currentPlayer.y + 1 < newBoard.columns && board[currentPlayer.x][currentPlayer.y + 1] >= 1 && board[currentPlayer.x][currentPlayer.y + 1] <= 9) {
        var z = board[currentPlayer.x][currentPlayer.y + 1];
        var playerIndex = playersList[z];
        getPlayer = players.indexOf(playerIndex);
        return players[getPlayer];
    }
}