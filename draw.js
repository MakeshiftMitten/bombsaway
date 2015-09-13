function drawLevelCentricObject(){
    
    //Function to draw the entire screen
    this.drawScene = function(){
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");        

            //Bounding Rect    
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
            draw.drawFilledRectCentered(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight, game.colors.Background);
            ctx.beginPath();
            ctx.rect(0, 0, gameCanvas.width, gameCanvas.height);             
            ctx.rect(0, 0, gameCanvas.width, gameCanvas.height - gameXToCanvasX(20));       
            ctx.stroke();        
            
            if(game.liveBomb)
                game.liveBomb.draw();
        
            if(game.liveWell)
                game.liveWell.draw();
        
        
            for(var b = 0; b < game.bombs.length; b++)
            {
                game.bombs[b].draw();            
            }    
        
            for(var w = 0; w < game.wells.length; w++)
            {
                game.wells[w].draw();            
            }    

            for(var p = 0; p < game.players.length; p++){
                game.players[p].draw();
            }
        
            for(var p = 0; p < game.powerups.length; p++){
                game.powerups[p].draw();
            }
        
            for(var b = 0; b < game.bots.length; b++){
                game.bots[b].draw();
            }
        
            for(var g = 0; g < game.generators.length; g++){
                game.generators[g].draw();
            }

            for(var d = 0; d < game.floors.length; d++){
                game.floors[d].draw();
            }
        
            for(var b = 0; b < game.buttons.length; b++){
                game.buttons[b].draw();
            }
        
            for(var m = 0; m < game.meters.length; m++){
                game.meters[m].draw();
            }
        
            draw.drawText(game.gameWidth/2- 27, game.gameHeight - 17, "Level: " + game.level);
            draw.drawText(game.gameWidth/2- 27,game.gameHeight - 15, "[G]ravity: " + game.gravity);
            
            draw.drawText(game.gameWidth/2- 27, game.gameHeight - 13, "Spawners: " + game.generators.length);
            draw.drawText(game.gameWidth/2- 27, game.gameHeight - 11, "Bots: " + game.bots.length);
            
            draw.drawText(game.gameWidth/2- 13, game.gameHeight - 2, "Gravity Wells");
            draw.drawText(game.gameWidth/2+ 9, game.gameHeight - 2, "Bombs");
            draw.drawText(game.gameWidth/2 - 1, game.gameHeight - 2, "Life");            
            draw.drawText(game.gameWidth/2 + 25, game.gameHeight - 17, "Score: " + game.score);
            draw.drawText(game.gameWidth/2 + 25, game.gameHeight - 15, "Move Speed: " + game.players[0].moveSpeed);
            draw.drawText(game.gameWidth/2 + 25, game.gameHeight - 13, "Max Bomb Ammo: " + game.players[0].maxBombAmmo);
            draw.drawText(game.gameWidth/2 + 25, game.gameHeight - 11, "Bomb Regen Rate: " + game.players[0].bombRegenRate);
            draw.drawText(game.gameWidth/2 + 25, game.gameHeight - 9, "Max Well Ammo: " + game.players[0].maxWellAmmo);
            draw.drawText(game.gameWidth/2 + 25, game.gameHeight - 7, "Well Regen Rate: " + game.players[0].wellRegenRate);
        
            draw.drawText(3, game.gameHeight - 9, "Directions: Survive");
            draw.drawText(3, game.gameHeight - 7, "WASD will move you, albeit very poorly.");            
            draw.drawText(3, game.gameHeight - 5, "Click to shoot self propelling bombs ");
            draw.drawText(3, game.gameHeight - 3, "Release to detonate!");
            draw.drawText(3, game.gameHeight - 1, "Mouse Wheel switches weapons. Good luck!");
        
        
           
            
            

            //Scaling rect        
            ctx.stroke()    
            ctx.closePath();

    }
    
    //Draw Primitives
    this.drawRect = function(gameX, gameY, gameWidth, gameHeight)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= game.ctx;// gameCanvas.getContext("2d");   

        ctx.rect(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
    }

    this.drawRectCentered = function(gameX, gameY, gameWidth, gameHeight, color)
    {
        
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   
        ctx.save();
        ctx.beginPath();
        ctx.rect(gameXToCanvasX(gameX-gameWidth/2), gameYToCanvasY(gameY-gameHeight/2), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    
    this.drawFilledRectCentered = function(gameX, gameY, gameWidth, gameHeight, color)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(gameXToCanvasX(gameX-gameWidth/2), gameYToCanvasY(gameY-gameHeight/2), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    
    this.drawCircle = function(gameX, gameY, radius, color)
    {    
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.arc(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
        ctx.stroke();    
        ctx.restore();
    }

    this.drawFilledCircle = function(gameX, gameY, radius, color)
    { 
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();    
        ctx.restore();
    }

    this.drawText = function(gameX, gameY, text)
    {
        var ctx = game.ctx;
        ctx.beginPath();
        ctx.fillText(text, gameXToCanvasX(gameX), gameYToCanvasY(gameY));    
        ctx.stroke();
    }
}

function drawPlayerCentricObject(){
    //Draw Primitives
    this.drawRect = function(gameX, gameY, gameWidth, gameHeight)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= game.ctx;// gameCanvas.getContext("2d");   

        ctx.rect(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
    }

    this.drawRectCentered = function(gameX, gameY, gameWidth, gameHeight)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   

        ctx.rect(gameXToCanvasX(game.players[0].x-gameX-gameWidth/2), gameYToCanvasY(game.players[0].y-gameY-gameHeight/2), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
    }

    this.drawCircle = function(gameX, gameY, radius, color)
    {    
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
        ctx.stroke();    
    }

    this.drawFilledCircle = function(gameX, gameY, radius)
    { 
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.beginPath();
        ctx.arc(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();    
    }

    this.drawText = function(gameX, gameY, text)
    {
        var ctx = game.ctx;
        ctx.beginPath();
        ctx.fillText(text, gameXToCanvasX(gameX), gameYToCanvasY(gameY));    
        ctx.stroke();
    }
}

