function shipGenerator(x, y, width, height, deployInterval, type){
    this.x = x;
    this.y = y;
    
    this.width = width;
    this.height = height;
    this.deployInterval = deployInterval;
    
    this.type = type;
    this.states = {"Alive":0, "Exploded":1, "Dissipated":2};
    this.state = this.states.Alive;
        
    this.currentTimer = this.deployInterval;
    
    this.velX = 0;
    this.velY = 0;
    
    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y - this.height/2};
    this.bottom = function(){return this.y + this.height/2};
    
    this.draw = function(){
        draw.drawFilledRectCentered(this.x, this.y, this.width, this.height, game.colors.Bomb);        
        draw.drawFilledRectCentered(this.x, this.y, this.width/2, this.height/2, game.colors.Bomb);        
        
        
    }       
    
    this.deploy = function(){
        if(this.type == game.weapons.Bomb){
            game.bots.push(new bot(this.x, this.y, 2, 2, .5, 10, game.weapons.Bomb));
        }
        if(this.type == game.weapons.Well){
            game.bots.push(new bot(this.x, this.y, 2, 2, .5, 10, game.weapons.Well));
        }                            
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
            this.explode();
        }
        if(this.x+this.width/2 > game.gameWidth){
            this.x = game.gameWidth - this.width/2;
            this.velX = -this.velX/2;
            this.explode();
        }
        if(this.y+this.height/2 > game.gameHeight - 20){            
            this.y = game.gameHeight - 20 - this.height/2;
            this.velY = -this.velY/2;
            this.explode();
        }        
        if(this.y-this.height/2 < 0){            
            this.y = this.height/2;
            this.velY = -this.velY/2;
            this.explode();
        }
        
    }
    
    this.explode = function(){
        this.state = this.states.Dissipated;
    }
    
    this.updateState = function(dt){
        this.currentTimer -= dt;
        if (this.currentTimer <= 0){
            this.deploy();
            this.currentTimer = this.deployInterval;
        }
        
    }
    
}