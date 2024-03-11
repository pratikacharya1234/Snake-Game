// variables
let inputDir ={ x:0, y:0};
let eatingSound = new Audio('eating.mp3');
let gameOver = new Audio('gameover.wav');
let moveSound = new Audio('movesound.wav');
let musicSound = new Audio('music.mp3');
let speed =6;
let lastPaintTime = 0;
let score = 0;
let snakeArr =[
    {x:13, y:15}
]
food = {x:6, y:7};
//select levels
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const hard = document.getElementById('hard');

easy.addEventListener('click', (e) =>{
    speed=3;
});

medium.addEventListener('click', (e) =>{
    speed=7;
});
hard.addEventListener('click', (e) =>{
    speed=15;
});

//all functions
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}


function isCollide(snake){
    //eating yourself
    for (let index = 1; index < snakeArr.length; index++){
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }    
    }
    //touch wall
        if(snake[0].x >= 18|| snake[0].x <=0 || snake[0].y>=18|| snake[0].y <=0){
            return true;
        } 
}

function gameEngine(){
    //updating snake array and foood
    if(isCollide(snakeArr)){
        gameOver.play();
        musicSound.pause(); 
        inputDir={x:0,y:0}; 
        alert("Game Over!!!.Press any key to play again");
        snakeArr =[
            {x:13, y:15}
        ];
        musicSound.play();
        score = 0;
    }

    //after eating food ,spawnning food again 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        eatingSound.play();
        score += 1;
        if(score > highscore){
            highscorevalue = score;
            localStorage.setItem("highscore", JSON.stringify(highscorevalue));
            highscoreBox.innerHTML = "High Score:" + highscorevalue;
        }
        scoreBox.innerHTML= "Score :" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        const a = 2;
        const b = 16;
        food = { x:  Math.round(a+(b-a)*Math.random()),y:  Math.round(a+(b-a)*Math.random())};
    }
//snake move

for (let i = snakeArr.length - 2; i >=0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
    
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

    // render  snake 
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // render  food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}













let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscorevalue = 0;
    localStorage.setItem("highscore", JSON.stringify(highscorevalue));
} else {
    highscorevalue = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score:" + highscorevalue;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = { x:0, y:1 }// game start
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x =0 ;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y=0 ;
            break;

        default:
            break;
    }
})

const upButton = document.getElementById("Arrowup");
const downButton = document.getElementById("Arrowdown");
const leftButton = document.getElementById("Arrowleft");
const rightButton = document.getElementById("Arrowright");

upButton.addEventListener('click', () => {
    console.log("ArrowUp");
    inputDir.x = 0;
    inputDir.y = -1;
});

downButton.addEventListener('click', () => {
    console.log("ArrowDown");
    inputDir.x = 0;
    inputDir.y = 1;
});

rightButton.addEventListener('click', () => {
    console.log("ArrowLeft");
    inputDir.x = -1;
    inputDir.y = 0;
});

leftButton.addEventListener('click', () => {
    console.log("ArrowRight");
    inputDir.x = 1;
    inputDir.y = 0;
});
