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
    draw.drawScene();
    requestAnimFrame(animLoop);
    game.lastTime = game.nowTime;
    
}

function update(dt){    
    
    game.botCooldownTimer -= dt;
    game.currentLevelTimer -= dt;
    if(game.currentLevelTimer <= 0)
    {
        game.levelUp();
    }
    
    if(game.keys[82]){
        console.log("new!");
        game = new gameObject();
        game.init();
    }
    /*
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
    */
    //G
    if(game.keys[71]){
        game.gravity++;
    }
    //H
    if(game.keys[72]){
        game.gravity--;
    }
    //J
    if(game.keys[74]){
        if(game.botCooldownTimer <= 0){            
            game.bots.push(new bot(6, 6, 2, 2, .5, 10));
            game.botCooldownTimer = 1;
        }
        game.keys[74] = false;
    }

    for(var p = 0; p < game.players.length; p++){
        game.players[p].update(dt);
    }
    
    for(var p = 0; p < game.powerups.length; p++){
        game.powerups[p].update(dt);
    }
    
    for(var b = 0; b < game.bots.length; b++){
        game.bots[b].update(dt);           
    }
    
    for(var s = 0; s < game.generators.length; s++){
        game.generators[s].update(dt);           
    }
    
    if(game.liveBomb)
        game.liveBomb.update(dt);
    
    if(game.liveWell)
        game.liveWell.update(dt);
    
    for(var b = 0; b < game.bombs.length; b++){
        game.bombs[b].update(dt);
    }
    
    for(var w = 0; w < game.wells.length; w++){
        game.wells[w].update(dt);
    }
    
    for(var m = 0; m < game.meters.length; m++){
        game.meters[m].update(dt);   
    }                
    
    clearSpentBombsAndWells();
}

function clearSpentBombsAndWells(){    
    for(var w = 0; w < game.wells.length; w++){
        if(game.wells[w].state == game.wells[w].states.Dissipated){
            game.wells.splice(w, 1);
            w-=1;
        }            
    }
    for(var w = 0; w < game.bots.length; w++){
        if(game.bots[w].state == game.bots[w].states.Dissipated){
            game.bots.splice(w, 1);
            w-=1;
        }            
    }
    
    for(var w = 0; w < game.generators.length; w++){
        if(game.generators[w].state == game.generators[w].states.Dissipated){
            game.generators.splice(w, 1);
            w-=1;
        }            
    }     
    
    
}

game = new gameObject();
game.init();
draw = new drawLevelCentricObject();
//draw = new drawPlayerCentricObject();
resizeGame();
animLoop();