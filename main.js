window.requestAnimFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();
    

function animLoop() {
    game.nowTime = Date.now();
    //var dt = (now - last)/16.66666666666666 * (.8);
    
    var dt = (game.nowTime-game.lastTime)/1000;
    update(dt);
    draw();
    requestAnimFrame(animLoop);
    game.lastTime = game.nowTime;
    
}

function update(dt){    
    if(game.keys[32]){
        //game.bombs[32]
        if(!game.bombMap[32]){                        
            game.bombMap[32] = true;
            game.bombs.push(new bomb(game.mouseX, game.mouseY, 0, 0));   
        }
    }
    if(!game.keys[32]){
       if(game.bombMap[32]){
            game.bombMap[32] = false;
        }
    }

    for(var p = 0; p < game.players.length; p++){
        game.players[p].update(dt);
    }
    
    for(var b = 0; b < game.bombs.length; b++){
        game.bombs[b].update(dt);
    }
}

game = new gameObject();
resizeGame();
animLoop();