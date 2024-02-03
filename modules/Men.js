var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Men extends LiveForm {
    constructor(x, y) {
        super(x,y);
          this.energy = 30;
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
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        if (newCell && this.multiply >= 1) {
            menHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let men = new Men(x, y);
            menArr.push(men);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < menArr.length; index++) {
            if (menArr[index].x == this.x && menArr[index].y == this.y) {
                menArr.splice(index, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            this.energy += 20;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < grassEaterArr.length; index++) {
                if (grassEaterArr[index].x == x && grassEaterArr[index].y == y) {
                    grassEaterArr.splice(index, 1)
                }
            }

            if(this.energy > 60){
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
            matrix[y][x] = 5;
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