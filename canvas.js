// canvas

function draw() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Assets liste */
    //PLayers
    var persoOne = new Image();
    persoOne.src = "images/perso/perso1.png";

    var persoTwo = new Image();
    persoTwo.src = "images/perso/perso2.png";

    var persoThree = new Image();
    persoThree.src = "images/perso/perso3.png";

    var persoFour = new Image();
    persoFour.src = "images/perso/perso4.png";

    var persoFive = new Image();
    persoFive.src = "images/perso/perso5.png";

    var persoSix = new Image();
    persoSix.src = "images/perso/perso6.png";

    var persoSeven = new Image();
    persoSeven.src = "images/perso/perso7.png";

    var persoEight = new Image();
    persoEight.src = "images/perso/perso8.png";
    
    // Obstacle

    var bush = new Image();
    bush.src = "images/board/bush.png";

    var rock = new Image();
    rock.src = "images/board/rock.png";

    //Pistol
    var pistol = new Image();
    pistol.src = "images/armes/pistol.png";

    // Magnum
    var magnum = new Image();
    magnum.src = "images/armes/magnum.png";

    //Shotgun
    var shotgun = new Image();
    shotgun.src = "images/armes/shotgun.png";

    //Rocket laucher
    var rocketLauncher = new Image();
    rocketLauncher.src = "images/armes/rocketLauncher.png";

    // Rifle
    var scar = new Image();
    scar.src = "images/armes/scarMini.png";

    /* Draw */
    scar.onload = function () {
        for (y = 0; y < newBoard.columns; y++) {
            for (x = 0; x < newBoard.rows; x++) {
                var i = y * 50;
                var j = x * 50;
                if (board[x][y] == 0) {
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 1) {
                    context.drawImage(persoOne, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 2) {
                    context.drawImage(persoTwo, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 3) {
                    context.drawImage(persoThree, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 4) {
                    context.drawImage(persoFour, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 5) {
                    context.drawImage(persoFive, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 6) {
                    context.drawImage(persoSix, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 7) {
                    context.drawImage(persoSeven, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 8) {
                    context.drawImage(persoEight, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                
                if (board[x][y] == 300) {
                    context.drawImage(rock, 0, 0, 600, 401, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 301) {
                    context.drawImage(bush, 0, 0, 600, 401, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 10 || board[x][y] == 110) {
                    context.drawImage(pistol, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 11 || board[x][y] == 111) {
                    context.drawImage(scar, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 12 || board[x][y] == 112) {
                    context.drawImage(shotgun, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 13 || board[x][y] == 113) {
                    context.drawImage(rocketLauncher, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 14 || board[x][y] == 114) {
                    context.drawImage(magnum, 0, 0, 512, 512, i, j, 50, 50);
                    context.strokeStyle = "#dcdcdc";
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] == 100) {
                    context.fillStyle = "#ffffff33";
                    context.fillRect(i, j, 50, 50);
                    context.strokeStyle = "#ffffff99"
                    context.strokeRect(i, j, 50, 50);
                }
                if (board[x][y] >= 110 && board[x][y] <= 199) {
                    context.fillStyle = "#ffffff33";
                    context.fillRect(i, j, 50, 50);
                    context.strokeStyle = "#ffffff99"
                    context.strokeRect(i, j, 50, 50);
                }
            }
        }
    }
}