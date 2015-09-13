function player(x, y){
    this.x = x;
    this.y = y;
    
    this.velX = 0;
    this.velY = 0;
    
    this.width = 1;
    this.height = 3;
    this.moveSpeed = 5;
    
    this.maxLife = 100;
    this.currentLife = 100;
    this.lifeRegen = 2;
    this.shotSpeed = 20;
    this.maxBombAmmo = 100;
    this.maxWellAmmo = 100;
    this.bombAmmo = 100;
    this.wellAmmo = 100;   
    this.bombRegenRate = 4;
    this.wellRegenRate = 4;
    
    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y - this.height/2};
    this.bottom = function(){return this.y + this.height/2};
    
    this.printSides = function(){        
        console.log("Player Right: " + this.right() + " Left: " + this.left() + " Top" + this.top() + " Bottom" + this.bottom());
    }
    
    this.draw = function(){
        if(this.currentLife > 0)
            draw.drawFilledRectCentered(this.x, this.y, this.width, this.height, game.colors.Ship);        
        else
            draw.drawText(game.gameWidth/2-8, game.gameHeight/2-6, "GAME OVER. PRESS R TO RESTART");
    }        
    
    this.shoot = function(player, x, y){        
        if(game.selectedWeapon == game.weapons.Bomb){    
            var testBomb = new bomb(player.x, player.y, player.velX, player.velY, x, y, this.shotSpeed);            
            if(player.bombAmmo >= testBomb.magnitude){
                game.liveBomb = testBomb;
                player.bombAmmo -= game.liveBomb.magnitude;
            }
        }
        else if(game.selectedWeapon == game.weapons.Well){
            var testWell = new well(player.x, player.y, player.velX, player.velY, x, y, this.shotSpeed);            
            if(player.wellAmmo >= testWell.magnitude){
                game.liveWell = testWell;
                player.wellAmmo -= game.liveWell.magnitude;
            }            
        }
    }
    
        
    this.update = function(dt){          
        //A
        if(game.keys[65]){
            this.velX += -this.moveSpeed*dt;
        }
        //D
        if(game.keys[68]){
            this.velX += this.moveSpeed*dt;
        }
                    
        if(game.keys[87]){
            this.velY += this.moveSpeed*dt;
        }
        
        if(game.keys[83]){
            this.velY += -this.moveSpeed*dt;
        }
        
        if(game.keys[69]){
            this.velY = 0;
            this.velX = 0;  
        }
        
        this.bombAmmo += this.bombRegenRate*dt;
        this.wellAmmo += this.wellRegenRate*dt;        
        if(this.currentLife > 0)
            this.currentLife += this.lifeRegen*dt;
        
        
        if(this.bombAmmo > this.maxBombAmmo)
            this.bombAmmo = this.maxBombAmmo;
        
        if(this.wellAmmo > this.maxWellAmmo)
            this.wellAmmo = this.maxWellAmmo;
        
        if(this.currentLife > this.maxLife)
            this.currentLife = this.maxLife;
        
        this.updateState(dt);
        
        var gravMult = 1;
        for(var w = 0; w < game.wells.length; w++)
        {
            var dist = Math.sqrt((game.wells[w].y-this.y)*(game.wells[w].y-this.y) + (this.x - game.wells[w].x)*(this.x-                                    game.wells[w].x));  
            console.log("dist " + dist);
            if(dist < game.wells[w].radius)
            {
                console.log("reverse grav");
                gravMult = -1;
            }
        }
        
        for(var w = 0; w < game.powerups.length; w++)
        {
            var dist = distance(game.powerups[w].x, game.powerups[w].y, this.x, this.y)
            if(dist < game.powerups[w].radius+1)
            {       
                if(game.powerups[w].type == game.powerupTypes.BombChargeRate){
                    this.bombRegenRate+=1;
                }
                if(game.powerups[w].type == game.powerupTypes.MaxBombAmmo){
                    this.maxBombAmmo+=5;
                }
                if(game.powerups[w].type == game.powerupTypes.WellChargeRate){
                    this.wellRegenRate+=1;
                }
                if(game.powerups[w].type == game.powerupTypes.MaxWellAmmo){
                    this.maxWellAmmo+=5;
                }
                console.log("hit powerup!");
                game.powerups.splice([w], 1);
                w--;
            }
        }        
        
        this.velY -= game.gravity*game.gravity*gravMult*dt;                        
        
        /*
        if(game.keys[87]){
            this.velY = 20;
        }
        */
        var oldX = this.x;
        var oldY = this.y;
        
        this.x += this.velX*dt;
        this.y -= this.velY*dt;   
        
        if(this.x-this.width/2 < 0){
            this.x = this.width/2;
            this.currentLife-= Math.abs(this.velX);
            this.velX = -this.velX/2;            
        }
        if(this.x+this.width/2 > game.gameWidth){
            this.x = game.gameWidth - this.width/2;
            this.currentLife-= Math.abs(this.velX);
            this.velX = -this.velX/2;            
        }
        if(this.y+this.height/2 > game.gameHeight - 20){            
            this.y = game.gameHeight - 20 - this.height/2;
            this.currentLife-= Math.abs(this.velY);
            this.velY = -this.velY/2;            
        }        
        if(this.y-this.height/2 < 0){            
            this.y = this.height/2;
            this.currentLife-= Math.abs(this.velY);
            this.velY = -this.velY/2;            
        }
    }
    
    this.updateState = function(dt){
        
    }
}