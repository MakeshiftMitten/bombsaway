//Function to draw the entire screen
function draw() {
    var gameCanvas = document.getElementById('gameCanvas');
    var ctx= gameCanvas.getContext("2d");        
        
        //Bounding Rect    
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
        ctx.beginPath();
        ctx.rect(0, 0, gameCanvas.width, gameCanvas.height);        
        ctx.stroke();        
                
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
    
        //Scaling rect        
        ctx.stroke()    
        ctx.closePath();

}


//Draw Primitives
function drawRect(gameX, gameY, gameWidth, gameHeight)
{
    var gameCanvas = document.getElementById('gameCanvas');
    var ctx= game.ctx;// gameCanvas.getContext("2d");   
    
    ctx.rect(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
    ctx.stroke();
}

function drawRectCentered(gameX, gameY, gameWidth, gameHeight)
{
    var gameCanvas = document.getElementById('gameCanvas');
    var ctx= gameCanvas.getContext("2d");   
    
    ctx.rect(gameXToCanvasX(gameX-gameWidth/2), gameYToCanvasY(gameY-gameHeight/2), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
    ctx.stroke();
}

function drawCircle(gameX, gameY, radius)
{    
    var ctx= game.ctx;// gameCanvas.getContext("2d");  
    ctx.beginPath();
    ctx.arc(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
    ctx.stroke();    
}

function drawFilledCircle(gameX, gameY, radius)
{ 
    var ctx= game.ctx;// gameCanvas.getContext("2d");  
    ctx.beginPath();
    ctx.arc(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();    
}

function drawText(gameX, gameY, text)
{
    var ctx = game.ctx;
    ctx.beginPath();
    ctx.fillText(text, gameXToCanvasX(gameX), gameYToCanvasY(gameY));    
    ctx.stroke();
}