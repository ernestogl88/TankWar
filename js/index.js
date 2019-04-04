window.onload = function(){
  const modal = document.querySelector('#modal'),
        game = document.querySelector('#game'),
        initbutton = document.querySelector('#initbutton'),
        init = document.querySelector('#init'),
        red = document.querySelector('#redArrow'),
        green = document.querySelector('#greenArrow'),
        blue = document.querySelector('#blueArrow')

  initbutton.onclick = function(){
    game.style.display = 'block';
    init.style.display = 'none';
    Game.init("canvas");
  }
  red.onclick = function(){
    Game.level++;
    modal.style.display ='none';
    debugger
    Game.init("canvas");
  } 
  
  blue.onclick = function(){
    modal.style.display ='none';
    Game.init("canvas");
  } 
  
  green.onclick = function(){
    modal.style.display ='none';
    window.location.replace("../TankWar/index.html");
  }   
};
