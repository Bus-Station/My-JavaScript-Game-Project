function setup() {

    var socket = io();

    var side = 10;

    var matrix = [];

    var weather;

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let fireCountElement = document.getElementById('fireCount');
    let menCountElement = document.getElementById('menCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let monsterCountElement = document.getElementById('monsterCount');
    let weatherElement = document.getElementById('weather');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        fireCountElement.innerText = data.fireCounter;
        menCountElement.innerText = data.menCounter;
        predatorCountElement.innerText = data.predatorCounter;
        monsterCountElement.innerText = data.monsterCounter;
        weatherElement.innerText = data.weather;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == 'spring') {
                        fill("green");
                    }else if (data.weather == 'summer') {
                        fill(90, 238, 90);
                    }else if (data.weather == 'autumn') {
                        fill(5, 109, 5);
                    } else if (data.weather == 'winther') {
                        fill('lightgreen');
                    }
                } else if (matrix[i][j] == 2) {
                    if (data.weather == 'spring') {
                        fill("yellow");
                    } else if (data.weather == 'summer') {
                        fill(248, 248, 91);
                    } else if (data.weather == 'autumn') {
                        fill(150, 150, 7);
                    } else if (data.weather == 'winther') {
                        fill(212, 212, 133);
                    }
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                } else if (matrix[i][j] == 3) {
                    if (data.weather == 'spring') {
                        fill("red");
                    } else if (data.weather == 'summer') {
                        fill(241, 81, 81);
                    } else if (data.weather == 'autumn') {
                        fill(97, 5, 5);
                    } else if (data.weather == 'winther') {
                        fill(247, 111, 111);
                    }
                } else if (matrix[i][j] == 4) {
                    if (data.weather == 'spring') {
                        fill("black");
                    } else if (data.weather == 'summer') {
                        fill(61, 48, 48);
                    } else if (data.weather == 'autumn') {
                        fill(80, 76, 76);
                    } else if (data.weather == 'winther') {
                        fill(66, 64, 64);
                    }
                } else if (matrix[i][j] == 5) {
                    if (data.weather == 'spring') {
                        fill("blue");
                    } else if (data.weather == 'summer') {
                        fill(80, 80, 240);
                    } else if (data.weather == 'autumn') {
                        fill(7, 7, 161);
                    } else if (data.weather == 'winther') {
                        fill(101, 101, 190);
                    }
                } else if (matrix[i][j] == 6) {
                    if (data.weather == 'spring') {
                        fill("magenta");
                    } else if (data.weather == 'summer') {
                        fill(247, 71, 247);
                    } else if (data.weather == 'autumn') {
                        fill(88, 9, 88);
                    } else if (data.weather == 'winther') {
                        fill(240, 185, 240);
                    }
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}