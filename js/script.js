window.onload = function () {

  var canvas = document.querySelector('#canvas');

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
    /** @type {CanvasRenderingContext2D} */
    var ctx = canvas.getContext('2d');

    var mouseDown, mouseUp, mouse;
    canvas.addEventListener('mousedown', function (e) {
      mouseDown = getMousePos(canvas, e);
      //console.log(`Ratón en la pos: [${mouseDown.x},${mouseDown.y}]`);
    });

  canvas.addEventListener('mouseup', function (e) {
    mouseUp = getMousePos(canvas, e);
    //console.log(`Ratón en la pos: [${mouseUp.x},${mouseUp.y}]`);
  });
  canvas.addEventListener('mousemove', function(e){
    mouse = getMousePos(canvas, e);
  });
  

  setInterval(() => {
    if (mouse != undefined)     drawMousePosition();
    if (mouseDown != undefined && mouseUp != undefined) {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fillRect(mouseDown.x, mouseDown.y, mouseUp.x - mouseDown.x, mouseUp.y - mouseDown.y);
      ctx.closePath();
      mouseDown = undefined;
      mouseUp = undefined;
    }
    
  }, 1000/60);

    function drawMousePosition (){
      var p = document.querySelector('#mousePosition');
      p.innerHTML = `[${mouse.x.toFixed(2)},${mouse.y.toFixed(2)}]`;
      // p.innerHTML = `[${mouseDown.x},${mouseDown.y}]
      // [${mouseUp.x},${mouseUp.y}]`;
    }

  





//   document.getElementById("start-button").onclick = function () {
//     car = new Image();   
//     car.src = 'images/car.png';
//     car.onload = function (){
//       startGame();
//     };
//   };

//   class Obstacle {
//     constructor(x, width){
//       this.x = x;
//       this.y = 0;
//       this.w = width;
//     }
//   }
//   var car;
//   var h = canvas.clientHeight;
//   var w = canvas.clientWidth;
//   var posX = w/2-25;
//   var lineStatus = 1;
//   var obstacles = [new Obstacle(50, 100),new Obstacle(250,150),new Obstacle(300,150),new Obstacle(100,200)];

//   window.onkeydown = function (e) {
//     if (e.keyCode === 37) {
//       if (posX>=55) posX-=5;
//       else posx=50;
//     }
//     else if (e.keyCode === 39) 
//     if (posX<395) posX +=5;
//     else posX=400;
// }
// function getMousePos(canvas, evt) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   };
// }

//   document.querySelector('#canvas').addEventListener('mousedown', function (e){
//     var mouse = getMousePos(document.querySelector('#canvas'),e);
//     alert(`Ratón en la pos: [${mouse.x},${mouse.y}]`);

//   });

//   function startGame() {
//     var canvas = document.querySelector('#canvas');
//     /** @type {CanvasRenderingContext2D} */
//     var ctx = canvas.getContext('2d');
//     var steps = 0;
//     var visibleObstacles = []
//     var intervalID = setInterval(function () {
//       steps++;
//       ctx.clearRect(0,0,w,h);
//       ctx.beginPath();
//       drawBoard(ctx, w, h);
//       ctx.drawImage(car,posX,h-110,50,100);
//       visibleObstacles = visibleObstacles.map(obstacle => {
//         return {...obstacle, y:obstacle.y+=5}
//       })
//          .filter(obstacle => obstacle.y < 530);
//       visibleObstacles.forEach(obstacle => drawRectangle(ctx,'red',obstacle.x,obstacle.y,obstacle.w, 20))
//       ctx.closePath();
//       if (steps===20){
//         visibleObstacles.push(obstacles[Math.floor(Math.random()*obstacles.length)]);
//         steps = 0;
//       }
//     }, 100);
//   }

//   function drawRectangle(ctx, color, x1, y1, x2, y2) {

//     ctx.fillStyle = color;
//     ctx.fillRect(x1, y1, x2, y2);
//     ctx.stroke();
    
//   }

//   function drawBoard(ctx, w, h) {

    
//     drawRectangle(ctx, 'green', 0, 0, w, h);
//     drawRectangle(ctx, 'grey', 50, 0, w - 100, h);
//     drawRectangle(ctx, 'white', 70, 0, 10, h);
//     drawRectangle(ctx, 'white', w - 80, 0, 10, h);
//     switch (lineStatus){
//       case 1:
//       ctx.moveTo(w / 2, 0);
//       break;
//       case 2:
//       ctx.moveTo(w / 2, 5);
//       break;
//       case 3:
//       ctx.moveTo(w / 2, 10);
//       break;
//       case 4:
//       ctx.moveTo(w / 2, 15);
//     }
//     if (lineStatus ===4) lineStatus=0;
//     lineStatus++;
//     ctx.lineTo(w / 2, h);
//     ctx.setLineDash([25, 15]);
//     ctx.lineWidth= 5;
//     ctx.strokeStyle = 'white';
//     ctx.stroke();
//     ctx.closePath(); 
//   }

//   function drawCar(ctx,x,y){

//     img = new Image();   
//     img.onload = function (){
//       ctx.drawImage(img,x,y,50,100);  
//     };
//     img.src = 'images/car.png';
//   }

}
