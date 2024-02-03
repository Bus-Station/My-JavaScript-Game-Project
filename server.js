var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Fire = require("./modules/Fire.js");
var Men = require("./modules/Men.js");
var Predator = require("./modules/Predator.js");
var Monster = require("./modules/Monster.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
weather = '';
grassArr = [];
grassEaterArr = [];
fireArr = [];
menArr = [];
predatorArr = [];
monsterArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
fireHashiv = 0;
menHashiv = 0;
predatorHashiv = 0;
monsterHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, fire, men, monster) {
    for (let index = 0; index < matrixSize; index++) {
        matrix[index] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[index][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < fire; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < men; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < monster; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(80, 50, 100, 30, 30, 20, 5);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                let fire = new Fire(x, y);
                fireArr.push(fire);
                fireHashiv++;
            }
            else if (matrix[y][x] == 5) {
                let men = new Men(x, y);
                menArr.push(men);
                menHashiv++;
            }
            else if (matrix[y][x] == 6) {
                let monster = new Monster(x, y);
                monsterArr.push(monster);
                monsterHashiv++;
            }
        }
    }
}
creatingObjects();


let counter = 0;

function game() {
    counter++;
    if (counter > 0 && counter <= 10){
        weather = 'spring';
    } else if (counter > 10 && counter <= 20){
        weather = 'summer';
    }else if (counter > 20 && counter <= 30){
        weather = 'autumn';
    }else if (counter > 30 && counter <= 40){
        weather = 'winther';
    }else {
        counter = 0;
    }

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].eat();
        }
    }
    if (menArr[0] !== undefined) {
        for (var i in menArr) {
            menArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (monsterArr[0] !== undefined) {
        for (var i in monsterArr) {
            monsterArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassEaterCounter: grassEaterHashiv,
        grassCounter: grassHashiv,
        fireCounter: fireHashiv,
        menCounter: menHashiv,
        predatorCounter: predatorHashiv,
        monsterCounter: monsterHashiv,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"


    io.sockets.emit("data", sendData);

}



setInterval(game, 1000)