let startGameHandler = document.getElementById('start-game');

startGameHandler.addEventListener('click', function(){
  document.getElementById('startscreen').className="d-none";
})

function launchGame(){

document.getElementById('canvas').className = "d-block";

const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const image = document.getElementById('source');
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

  ctx.drawImage(image, canvas.width/2 - 200, canvas.height/2 - 100, 400, 200);
  ctx.fillRect(840 , 700, 180, 50);
  ctx.font = "25px Courier new";
  ctx.fillStyle = "white";
  ctx.fillText("Start Game", 845, 730);
  }
  refresh();
  button.addEventListener("click", refresh, false);
}

