// START GAME BUTTON
let startGameHandler = document.getElementById('start-game');

startGameHandler.addEventListener('click', function(){
  document.getElementById('startscreen').className="d-none";
});


// START GAME 
function launchGame(){

  // CREATE CANVAS
  document.getElementById('canvas').className = "d-block";
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  let snakeOrientation = 0; 
  let shifter = {};
  let interval;

  // SNAKE SETTINGS
  let snake = { 
    height: 25,
    width: 25,
    backgroundColor : "red"
  };

  let snakeCoordinates = [
    { x : Math.floor(canvas.width/2), y : Math.floor(canvas.height/2) },
    { x : Math.floor(canvas.width/2), y : Math.floor(canvas.height/2) + snake.width },
    { x : Math.floor(canvas.width/2), y : Math.floor(canvas.height/2) + snake.width*2 },
  ];

  //GENERATE FOOD
  let foodCoordinates = { 
    x : Math.floor(Math.random()*canvas.width - 12),
    y : Math.floor(Math.random()*canvas.height - 12)
  };

  // DRAW SNAKE
  function drawSnake() {
    for(let i = 0; i < snakeCoordinates.length; i++){
      ctx.fillStyle = snake.backgroundColor;
      ctx.fillRect(snakeCoordinates[i].x, snakeCoordinates[i].y, snake.width, snake.height);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 5;
      ctx.strokeRect(snakeCoordinates[i].x, snakeCoordinates[i].y, snake.width, snake.height);
    };
  };

  // CLEAR CANVAS
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // MOVES EVENTS
  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
      snakeOrientation = 0;
    } else if (e.keyCode == '40') {
      snakeOrientation = 1;
    } else if (e.keyCode == '37') {
      snakeOrientation = 2;
    } else if (e.keyCode == '39') {
      snakeOrientation = 3;
    };
  };

  function initializeInterval(){
    interval = setInterval(launchInterval, 120);
  };

  // MOVEMENTS UPDATE + REFRESH CANVAS/SNAKE/FOOD
  function launchInterval(){
    update();
    drawSnake();
    generateFood();
    if(snakeOrientation === 0){
      shifter = snakeCoordinates.pop();
      shifter.y = snakeCoordinates[0].y - snake.height;
      shifter.x = snakeCoordinates[0].x;
      if(shifter.y < 0){
        endGame();
      } else {
        if(
          shifter.y <= foodCoordinates.y + 12 && 
          shifter.y >= foodCoordinates.y - 12 &&
          shifter.x <= foodCoordinates.x + 12 &&
          shifter.x >= foodCoordinates.x - 12
          ){
          foodCollision();
          generateFood();
          
        }
        return snakeCoordinates.unshift(shifter);
      }
    } else if(snakeOrientation === 1){
      shifter = snakeCoordinates.pop();
      shifter.y = snakeCoordinates[0].y + snake.height;
      shifter.x = snakeCoordinates[0].x;
      if(shifter.y > canvas.height){
        endGame();
      } else if(
        shifter.y <= foodCoordinates.y + 12 && 
        shifter.y >= foodCoordinates.y - 12 &&
        shifter.x <= foodCoordinates.x + 12 &&
        shifter.x >= foodCoordinates.x - 12
        ){
        foodCollision();
        generateFood();
      } 
      return snakeCoordinates.unshift(shifter);
    } else if(snakeOrientation === 2){
      shifter = snakeCoordinates.pop();
      shifter.x = snakeCoordinates[0].x - snake.width;
      shifter.y = snakeCoordinates[0].y;
      if(shifter.x < 0){
        endGame();
      } else if(
        shifter.y <= foodCoordinates.y + 12 && 
        shifter.y >= foodCoordinates.y - 12 &&
        shifter.x <= foodCoordinates.x + 12 &&
        shifter.x >= foodCoordinates.x - 12
        ){
        foodCollision();
        generateFood();
      }
      return snakeCoordinates.unshift(shifter);
    } else if(snakeOrientation === 3){
      shifter = snakeCoordinates.pop();
      shifter.x = snakeCoordinates[0].x + snake.width;
      shifter.y = snakeCoordinates[0].y;
      if(shifter.x > canvas.width){
        endGame();
      } else if(
        shifter.y <= foodCoordinates.y + 12 && 
        shifter.y >= foodCoordinates.y - 12 &&
        shifter.x <= foodCoordinates.x + 12 &&
        shifter.x >= foodCoordinates.x - 12
        ){
        foodCollision();
        generateFood();
      }
      return snakeCoordinates.unshift(shifter);
    }
  };

  initializeInterval();

  function foodCollision(){
    foodCoordinates.y = Math.floor(Math.random()*canvas.height - 12)
    foodCoordinates.x = Math.floor(Math.random()*canvas.width - 12)
  }

  function generateFood() {
    ctx.fillStyle = snake.backgroundColor;
    ctx.fillRect( foodCoordinates.x - 12, foodCoordinates.y -12, 24, 24);
    ctx.beginPath(); 
    ctx.arc(foodCoordinates.x, foodCoordinates.y, 12, 0, Math.PI * 2, true);
    ctx.fillStyle = "#003d99";
    ctx.fill();
    ctx.closePath();
  };

  function endGame(){
    clearInterval(interval);
  }
};