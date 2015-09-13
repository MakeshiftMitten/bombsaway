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
            if(game.isMobile())
                draw.drawText(0, 10, "MOBILE");                             
            else
                draw.drawText(0, 10, "NOT MOBILE"); 
            
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
        
            draw.drawText(20, game.gameHeight -10, "[G]ravity: " + game.gravity);
            draw.drawText(20, game.gameHeight - 11, "Level: " + game.level);
            
            draw.drawText(game.gameWidth/2- 13, game.gameHeight - 2, "Gravity Wells");
            draw.drawText(game.gameWidth/2+ 9, game.gameHeight - 2, "Bombs");
            draw.drawText(game.gameWidth/2 - 1, game.gameHeight - 2, "Life");
            draw.drawText(game.gameWidth/2- 25, game.gameHeight - 17, "Level");
            
            

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