function drawLevelCentricObject(){
    
    //Function to draw the entire screen
    this.drawScene = function(){
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");        

            //Bounding Rect    
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
            ctx.beginPath();
            ctx.rect(0, 0, gameCanvas.width, gameCanvas.height);                  
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

            for(var p = 0; p < game.players.length; p++){
                game.players[p].draw();
            }

            for(var d = 0; d < game.floors.length; d++){
                game.floors[d].draw();
            }
        
            for(var b = 0; b < game.buttons.length; b++){
                game.buttons[b].draw();
            }
        
            draw.drawText(20, game.gameHeight -10, "[G]ravity: " + game.gravity);
            

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

    this.drawRectCentered = function(gameX, gameY, gameWidth, gameHeight)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   

        ctx.rect(gameXToCanvasX(gameX-gameWidth/2), gameYToCanvasY(gameY-gameHeight/2), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
    }

    this.drawCircle = function(gameX, gameY, radius)
    {    
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.beginPath();
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

    this.drawCircle = function(gameX, gameY, radius)
    {    
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.beginPath();
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