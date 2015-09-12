function mouseClick(){
    game.ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);     
    var gameArea = document.getElementById('gameArea');
    
    var x = (event.clientX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    var y = (event.clientY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    //Demo: Add a bomb on click
    //game.bombs.push(new bomb(x, y));    
    //game.bombs.push(new bomb(game.players[0].x, game.players[0].y, 0, 0, game.mouseX, game.mouseY));
    for(var b = 0; b < game.buttons.length; b++)
    {
        if(mouseHitButton(x, y, game.buttons[b]))
        {
            game.selectedWeapon = game.buttons[b].type;  
            return null;
        }
    }
    if(game.selectedWeapon == game.weapons.Bomb)    
        game.liveBomb  = new bomb(game.players[0].x, game.players[0].y, game.players[0].velX, game.players[0].velY, x, y);
    else if(game.selectedWeapon == game.weapons.Well)
        game.liveWell  = new well(game.players[0].x, game.players[0].y, game.players[0].velX, game.players[0].velY, x, y);
    //game.bombs[0] = 
}

function mouseUp(){
    game.ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);     
    var gameArea = document.getElementById('gameArea');
    
    var x = (event.clientX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    var y = (event.clientY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    //Demo: Add a bomb on click
    //game.bombs.push(new bomb(x, y));    
    //game.bombs.push(new bomb(game.players[0].x, game.players[0].y, 0, 0, game.mouseX, game.mouseY));   
    /*
    if(game.bombs[0]){
        if(game.bombs[0].state == game.bombs[0].states.Placed){
            game.bombs[0].explode();
        }
    }
    */
    
    if(game.liveBomb){
        if(game.liveBomb.state == game.liveBomb.states.Placed){
            game.liveBomb.explode();
        }
    }
    if(game.liveWell){
        if(game.liveWell.state == game.liveWell.states.Placed){
            game.liveWell.explode();
        }
    }
}


function mouseMoved(){
    var x = (event.clientX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    var y = (event.clientY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    game.mouseX = x;
    game.mouseY = y;
}

function switchWeapon(){
    game.selectedWeapon++
    game.selectedWeapon %= 2;
}
    

function keyDown(){ 
  game.keys[event.keyCode] = true;
}

function keyUp(){ 
  game.keys[event.keyCode] = false;
}

window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

//if(!game.isMobile()){
gameCanvas.addEventListener('mousedown', mouseClick, false);
gameCanvas.addEventListener('mouseup', mouseUp, false);
gameCanvas.addEventListener('mousemove', mouseMoved, false);
window.addEventListener("mousewheel", switchWeapon, false);
//}


gameCanvas.addEventListener('touchstart', mouseClick, false);
gameCanvas.addEventListener('touchend', mouseUp, false);

window.addEventListener("shake", switchWeapon, false);
//}


window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);