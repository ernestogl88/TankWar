window.onload = function(){
  document.querySelector('#initbutton').onclick = function(){
    document.querySelector('#game').style.display = 'block';
    document.querySelector('#init').style.display = 'none';
    img = new Image(),
    img.src = './img/frame.jpg';
    img.onload = Game.init("canvas");
  }
  
};
