//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var MeatEater  = require("./modules/MeatEaters.js");
var Man  = require("./modules/Amenaker.js");
let random = require('./modules/random.js');
let random_shuffle = require('./modules/random_shuffle.js');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
meatEaterArr = [];
manArr = [];
matrix = [];
ObjMatrix= [];
MeatEaterHashiv=0;
GrassEaterHashiv=0;
GrassHashiv=0;
ManHashiv=0;
//! Setting global arrays  -- END

//! Creating MATRIX -- START
function matrixGenerator(matrixSize, G, GE, ME, AM) {
    let shuff=[];
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        ObjMatrix[i]= [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
            shuff[i*matrixSize+o]=[i,o];
        }
    }
    random_shuffle(shuff);
    console.log(grassArr.length);
    let sum=0;
    for (let i = sum; i < sum+G; i++) {
        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new Grass(customX,customY);
    }
    sum+=G;
    console.log(grassArr.length);
    for (let i = sum; i < sum+GE; i++) {

        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new GrassEater(customX,customY);
    }
    sum+=GE;
    for (let i = sum; i < sum+ME; i++) {

        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new MeatEater(customX,customY);
    }
    sum+=ME;
    for (let i = sum; i < sum+AM; i++) {

        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new Man(customX,customY);
    }
    console.log(grassArr.length);
}
matrixGenerator(5, 5, 5, 5, 5);


//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3001);
//! SERVER STUFF END  --  END


function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].update();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].update();
        }
    }
    if (meatEaterArr[0] !== undefined) {
        for (var i in meatEaterArr) {
            meatEaterArr[i].update();
        }
    }
    if (manArr[0] !== undefined) {
        for (var i in manArr) {
            manArr[i].update();
        }
    }


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length
    }
    //console.log(grassArr);
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000);
