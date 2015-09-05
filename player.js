function player(x, y){
    this.x = x;
    this.y = y;
    
    this.velX = 0;
    this.velY = 0;
    
    this.width = 1;
    this.height = 3;
        
    
    this.draw = function(){
        drawRectCentered(this.x, this.y, this.width, this.height);        
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
        this.velY -= 10*10*dt;                
        
        if(playerFloorHit(this, game.floors[0])){
            this.velY = 0;   
        }
        this.x += this.velX*dt;
        this.y -= this.velY*dt;                    
        
    }
    
    this.updateState = function(dt){
        
    }
}