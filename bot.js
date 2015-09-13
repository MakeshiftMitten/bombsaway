function bot(x, y, width, height, fireInterval, shotSpeed, shotDuration, type) {
    this.x = x;
    this.y = y;
    
    this.width = width;
    this.height = height;
    
    this.fireInterval = fireInterval;
    this.shotSpeed = shotSpeed;
    
    this.type = type;
    this.states = {"Alive":0, "Exploded":1, "Dissipated":2};
    this.state = this.states.Alive;
    
    this.shotTimer = 4;
    this.currentTimer = this.shotTimer;
    
    this.velX = Math.random()*8-4;
    this.velY = Math.random()*8-4;
    
    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y - this.height/2};
    this.bottom = function(){return this.y + this.height/2};
    
    this.printSides = function(){        
        console.log("Player Right: " + this.right() + " Left: " + this.left() + " Top" + this.top() + " Bottom" + this.bottom());
    }
    
    this.draw = function(){
        var color = this.type == game.weapons.Bomb ? game.colors.Bomb:game.colors.Well;
        draw.drawFilledRectCentered(this.x, this.y, this.width, this.height, color);        
    }       
    
    this.shoot = function(){        
        
        if(this.type == game.weapons.Bomb){
            game.bombs.push(new bomb(this.x, this.y, 0, 0, game.players[0].x, game.players[0].y, 20));
        }
        if(this.type == game.weapons.Well){
            game.wells.push(new well(this.x, this.y, 0, 0, game.players[0].x, game.players[0].y, 20));
        }                            
    }
        
    
        
    this.update = function(dt){                      
        
        this.updateState(dt);
        
        var gravMult = 1;
        for(var w = 0; w < game.wells.length; w++)
        {
            var dist = Math.sqrt((game.wells[w].y-this.y)*(game.wells[w].y-this.y) + (this.x - game.wells[w].x)*(this.x-game.wells[w].x));              
            if(dist < game.wells[w].radius)
            {
                console.log("reverse grav");
                gravMult = -1;
            }
        }        
        //this.velY -= game.gravity*game.gravity*gravMult*dt;                        
        
        this.x += this.velX*dt;
        this.y -= this.velY*dt;                   
        
        if(this.x-this.width/2 < 0){
            this.x = this.width/2;
            this.velX = this.velX/2;
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
        game.score += 50;
        if(this.type == game.weapons.Bomb){
            game.powerups.push(new powerup(this.x, this.y, this.velX, this.velY, game.powerupTypes.BombChargeRate));
        }
        if(this.type == game.weapons.Well){
            game.powerups.push(new powerup(this.x, this.y, this.velX, this.velY, game.powerupTypes.WellChargeRate));
        } 
        
    }
    
    this.updateState = function(dt){
        this.currentTimer -= dt;
        if (this.currentTimer <= 0){
            this.shoot();
            this.currentTimer = this.shotTimer;
        }
        
        
    }
}

