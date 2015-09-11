function player(x, y){
    this.x = x;
    this.y = y;
    
    this.velX = 0;
    this.velY = 0;
    
    this.width = 1;
    this.height = 3;
    
        
    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y - this.height/2};
    this.bottom = function(){return this.y + this.height/2};
    
    this.printSides = function(){        
        console.log("Player Right: " + this.right() + " Left: " + this.left() + " Top" + this.top() + " Bottom" + this.bottom());
    }
    
    this.draw = function(){
        draw.drawRectCentered(this.x, this.y, this.width, this.height);        
    }        
    
        
    this.update = function(dt){          
        
        if(game.keys[65]){
            this.velX = -3;
        }
        
        if(game.keys[68]){
            this.velX = 3;
        }
        
        if(game.keys[87]){
            this.velY = 20;
        }
        
        if(game.keys[69]){
            game.bombs.push(new bomb(this.x, this.y, 30, 50));   
        }
        
        this.updateState(dt);
        
        var gravMult = 1;
        for(var w = 0; w < game.wells.length; w++)
        {
            var dist = Math.sqrt((game.wells[w].y-this.y)*(game.wells[w].y-this.y) + (this.x - game.wells[w].x)*(this.x-game.wells[w].x));  
            console.log("dist " + dist);
            if(dist < game.wells[w].radius)
            {
                console.log("reverse grav");
                gravMult = -1;
            }
        }
        console.log(this.velY + " " + game.gravity + " " + dt);
        this.velY -= game.gravity*game.gravity*gravMult*dt;                
        console.log(this.velY);
        
        
        if(game.keys[87]){
            this.velY = 20;
        }
        var oldX = this.x;
        var oldY = this.y;
        
        this.x += this.velX*dt;
        this.y -= this.velY*dt;   
        
        if(playerFloorHit(this, game.floors[0])){
            //if(
            this.velY = 0;
            //this.x = oldX;
            this.y = game.floors[0].top()-this.height/2;
            //this.y = game.floors[0].top() - this.height/2;
        }
        
        if(this.x-this.width/2 < 0){
            this.x = this.width/2;
            this.velX = -this.velX/2;
        }
        if(this.x+this.width/2 > game.gameWidth){
            this.x = game.gameWidth - this.width/2;
            this.velX = -this.velX/2;
        }
        if(this.y+this.height/2 > game.gameHeight - 20){
            console.log("This.y: " + (this.y + this.height/2));
            console.log("This.gameHeight " + (game.gameHeight - 20));
            this.y = game.gameHeight - 20 - this.height/2;
            this.velY = -this.velY/2;
        }
        
    }
    
    this.updateState = function(dt){
        
    }
}