function mouseClick(){
    game.ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);     
    var gameArea = document.getElementById('gameArea');
    
    var x = (event.clientX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    var y = (event.clientY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    //Demo: Add a bomb on click
    //game.bombs.push(new bomb(x, y));    
    game.bombs.push(new bomb(game.players[0].x, game.players[0].y, 0, 0, game.mouseX, game.mouseY));
}

function mouseMoved(){
    var x = (event.clientX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    var y = (event.clientY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    game.mouseX = x;
    game.mouseY = y;
}

function keyDown(){ 
  game.keys[event.keyCode] = true;
}

function keyUp(){ 
  game.keys[event.keyCode] = false;
}

window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

gameCanvas.addEventListener('click', mouseClick, false);
gameCanvas.addEventListener('mousemove', mouseMoved, false);

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);