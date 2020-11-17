var ball;

//location (ball) --- ref()
//read --- on()
//write ---- set()

var database;
var ballPosition;

function setup(){
    createCanvas(500,500);
    ball = createSprite(10,10,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    ballPosition =  database.ref("ball/position");
    ballPosition.on("value", readPosition, showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;   
}

function showError(){
    console.log("Oops , Some Error!!")
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x:position.x+x, 
        y:position.y+y
    });
}