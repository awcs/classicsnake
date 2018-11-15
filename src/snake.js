const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const image = document.getElementById('source');

ctx.drawImage(image, canvas.width/2 - 200, canvas.height/2 - 100, 400, 200);
ctx.fillRect(840 , 700, 180, 50);
ctx.font = "25px Courier new";
ctx.fillStyle = "white";
ctx.fillText("Start Game", 845, 730);