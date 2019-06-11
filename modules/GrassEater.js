var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GrassEater extends LiveForm {
    constructor(x, y) {
        super(x, y, 10);
        matrix[y][x]=2;
        GrassEater.push(this);
        Hashiv["GrassEater"]++;
        this.CanMul=0;
        ObjMatrix[y][x]=this;
    }
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        this.canMul++;
        let OtherGrassEaters=this.chooseCell(2);
        if (OtherGrassEaters && this.CanMul>=5){
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
            let LovePair = super.GetObj(random(OtherGrassEaters)); 
            if (newCell && LovePair) {
                let x = newCell[0];
                let y = newCell[1];
                new GrassEater(x, y);
                LovePair.CanMul=0;
                this.canMul=0;
                return true;
            }
        }
        return false;
    }
    eat() {
        let GrassCells = this.chooseCell(1);
        let newCell = random(GrassCells);

        if (newCell) {

            this.life++;
            super.move(newCell);
        }
        else {
            this.life--;
            if (this.life < 0) {
                this.die();
            }
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);

            if (newCell) {
                super.move(NewCell);
            }
            
        }
    }
    update(){
        this.mul();
        this.eat();
    }
    die() {
        super.die(grassEaterArr);
    }
}