var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Zombie extends LiveForm {
    constructor(x, y) {
        super(x, y, 1000);
        matrix[y][x]=5;
        zombieArr.push(this);
        ZombieHashiv++;
        ObjMatrix[y][x]=this;
    }
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
    } 
    update(){
        let EmptyCells = this.chooseCell(0);
        if (EmptyCells.length<=5){
            this.die();
            return;
        }
        let ManCell = random(this.chooseCell(4));
        if (ManCell) {
            //console.log(1);
            super.GetObject(ManCell).die();
            new Zombie(ManCell[0],ManCell[1]);
        }
        else {

            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
            if (newCell) {
                super.move(newCell);
            } 
        }
    }
    die() {
        super.die(zombieArr);
    }
}