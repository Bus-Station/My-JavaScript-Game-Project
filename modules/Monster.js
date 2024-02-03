var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Monster extends LiveForm {
    constructor(x, y) {
        super(x,y);
          this.energy = 50;
          this.multiply = 0;
      }
      getNewDirections(){
          this.directions = [
              [this.x - 1, this.y - 1],
              [this.x, this.y - 1],
              [this.x + 1, this.y - 1],
              [this.x - 1, this.y],
              [this.x + 1, this.y],
              [this.x - 1, this.y + 1],
              [this.x, this.y + 1],
              [this.x + 1, this.y + 1]
          ];
      }
      chooseCell(char) {
          this.getNewDirections();
          return super.chooseCell(char);
      }
    mul() {
        let newCell = random(this.chooseCell(0));
        this.multiply++;
        if (newCell && this.multiply >= 1) {
            monsterHashiv++
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            let monster = new Monster(x, y);
            monsterArr.push(monster);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < monsterArr.length; index++) {
            if (monsterArr[index].x == this.x && monsterArr[index].y == this.y) {
                monsterArr.splice(index, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let a = this.chooseCell(5).concat(this.chooseCell(2));
        let b = this.chooseCell(3);
        let newCell = random(a.concat(b));
        if (newCell) {
            this.energy += 20;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < grassEaterArr.length; index++) {
                if (grassEaterArr[index].x == x && grassEaterArr[index].y == y) {
                    grassEaterArr.splice(index, 1)
                }
            }
            for (let i = 0; i < menArr.length; i++) {
                if (menArr[i].x == x && menArr[i].y == y) {
                    menArr.splice(i, 1)
                }
            }
            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }

            if(this.energy > 70){
                this.mul()
            }
        }
        else { this.move() }
    }
    move(){
        this.energy--;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (newCell && this.energy < 0){
            this.die();
        }
        if (this.energy < 0){
            this.die();
        }
    }
}