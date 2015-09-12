function bot(x, y, width, height, fireRate, shotSpeed) {
    this.x = x;
    this.y = y;
    
    this.width = width;
    this.height = height;
    
    this.fireRate = fireRate;
    this.shotSpeed = shotSpeed;
    
    this.velX = 4;
    this.velY = 4;
    
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
    
    this.shoot = function(){
           
    }
        
    
        
    this.update = function(dt){                      
        
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
        
        this.x += this.velX*dt;
        this.y -= this.velY*dt;                   
        
        if(this.x-this.width/2 < 0){
            this.x = this.width/2;
            this.velX = -this.velX/2;
        }
        if(this.x+this.width/2 > game.gameWidth){
            this.x = game.gameWidth - this.width/2;
            this.velX = -this.velX/2;
        }
        if(this.y+this.height/2 > game.gameHeight - 20){            
            this.y = game.gameHeight - 20 - this.height/2;
            this.velY = -this.velY/2;
        }        
        if(this.y-this.height/2 < 0){            
            this.y = this.height/2;
            this.velY = -this.velY/2;
        }
        
    }
    
    this.updateState = function(dt){
        
    }
}

