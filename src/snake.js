// START GAME BUTTON
let startGameHandler = document.getElementById('start-game');

startGameHandler.addEventListener('click', function(){
  document.getElementById('startscreen').className="d-none";
})


// START GAME 
function launchGame(){

  let snakeBlock ;
  let snakeOrientation = 0 ; 

    // MOVES EVENTS
  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
      snakeOrientation = 0
    } else if (e.keyCode == '40') {
      snakeOrientation = 1
    } else if (e.keyCode == '37') {
      snakeOrientation = 2
    } else if (e.keyCode == '39') {
      snakeOrientation = 3
    }
  }

  class snakeBlockAnimation {

    constructor(width,height,color,x,y){
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y; 
      this.numberBlockSnake = [0, 1, 2, 3, 4];
      this.update = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for( let i = 0; i< this.numberBlockSnake.length; i++){
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y+i*25, this.width, this.height);
        }
      }
    }
  }

  document.getElementById('canvas').className = "d-block";
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  snakeBlock = new snakeBlockAnimation(25,25,"red",canvas.width/2, canvas.height/2);
  
  setInterval( () => {
    snakeBlock.update();
    if(snakeOrientation === 0){
      snakeBlock.y -= 25; 
    } else if(snakeOrientation === 1){
      snakeBlock.y += 25; 
    } else if(snakeOrientation === 2){
      snakeBlock.x -= 25;
    } else if(snakeOrientation === 3){
      snakeBlock.x += 25;
    }
  }, 60);


const button = document.getElementById("refresh");

let refresh = function() {

  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  let x = Math.floor(Math.random()*canvas.width - 10);
  let y = Math.floor(Math.random()*canvas.height - 10);
  
  ctx.beginPath(); 
  ctx.arc(x, y, 10, 0, Math.PI * 2, true);
  ctx.fillStyle = "#003d99";
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle ="#FF0000"
  ctx.fillRect(canvas.width/2, canvas.height/2, 25, 25);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 5;
  ctx.strokeRect(canvas.width/2, canvas.height/2, 25, 25);

  refresh();
  button.addEventListener("click", refresh, false);

}






