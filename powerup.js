function powerup(x, y, velX, velY, type){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.radius = 1;
    this.type = type;
    
    this.update = function(dt){
        this.x += this.velX*dt;
        this.y -= this.velY*dt;  
        
        if(this.x-this.radius < 0){
            this.x = this.radius;
            this.velX = -this.velX/2;
        }
        if(this.x+this.radius > game.gameWidth){
            this.x = game.gameWidth - this.radius;
            this.velX = -this.velX/2;
        }
        if(this.y+this.radius > game.gameHeight - 20){            
            this.y = game.gameHeight - 20 - this.radius;
            this.velY = -this.velY/2;
        }        
        if(this.y-this.radius < 0){            
            this.y = this.radius;
            this.velY = -this.velY/2;
        }
        
    }
    
    this.draw = function(){
        if(this.type == game.powerupTypes.BombChargeRate){
            draw.drawFilledCircle(this.x, this.y, this.radius, game.colors.Bomb);    
        }
        if(this.type == game.powerupTypes.MaxBombAmmo){
            draw.drawFilledCircle(this.x, this.y, this.radius, game.colors.Bomb);    
        }
        if(this.type == game.powerupTypes.WellChargeRate){
            draw.drawFilledCircle(this.x, this.y, this.radius, game.colors.Well);    
        }
        if(this.type == game.powerupTypes.MaxWellAmmo){
            draw.drawFilledCircle(this.x, this.y, this.radius, game.colors.Well);    
        }
    }
    
}