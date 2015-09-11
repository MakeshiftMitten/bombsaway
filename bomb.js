function bomb(x, y, velX, velY, destX, destY){
    
    
    var slopeTop= destY - y;
    var slopeBottom = destX - x;
    var slope = slopeTop/slopeBottom;
    
    var deg = Math.atan(Math.abs(slopeTop/slopeBottom));    
    var dist = Math.sqrt((y-destY)*(y-destY) + (x-destX)*(x-destX));    

    var xRef = (destX-x)/Math.abs(destX-x);
    var yRef = -(destY-y)/Math.abs(destY-y);
    
    this.velX = velX + Math.cos(deg)*xRef*10;
    this.velY = velY + Math.sin(deg)*yRef*10;
    this.magnitude = dist;
    
    //this.velX = Math.cos(deg)*dist*xRef*2;
    //this.velY = Math.sin(deg)*dist*yRef*2;
        
    this.x = x;
    this.y = y;
    
    this.radius = .5;
    
    //Timers and Radii
    this.plantTimer = 1;
    this.plantBaseRadius = this.radius;
    
    this.explodeTimer = .5;
    this.explosionBaseRadius = .5;
    this.explosionMaxRadius = dist/2;
    
    //Start in the plant state
    this.states = {"Placed":0, "Detonated":1, "Dissipated":2};
    this.state = this.states.Placed;
    this.currentTimer = this.plantTimer;    
    
    this.draw = function(){
        //drawRectCentered(this.x, this.y, 10, 10);
        
        if(this.state == this.states.Placed)
        {
            draw.drawCircle(this.x, this.y, this.radius);            
        }        
        else if(this.state  == this.states.Detonated)
        {
            if(game.selectedWeapon == game.weapons.Bomb)
                draw.drawFilledCircle(this.x, this.y, this.radius);            
            if(game.selectedWeapon == game.weapons.Well)
                draw.drawCircle(this.x, this.y, this.radius);            
            
        }
    }
    
    this.explode = function(){        
        this.state = this.states.Detonated;
        this.currentTimer = this.explodeTimer;
        this.radius = this.explosionBaseRadius;
        
        var player = game.players[0];        
        
        var slopeTop= player.y - this.y;
        var slopeBottom = player.x - this.x;
        var slope = slopeTop/slopeBottom;
        
        var deg = Math.atan(Math.abs(slopeTop/slopeBottom));          
        var dist = Math.sqrt((this.y-player.y)*(this.y-player.y) + (player.x - this.x)*(player.x-this.x));    
        
        var xRef = (player.x - this.x)/Math.abs(player.x - this.x);
        var yRef = -(player.y - this.y)/Math.abs(player.y - this.y);
        
        game.players[0].velX += Math.cos(deg)*xRef*this.magnitude/dist/dist;
        game.players[0].velY += Math.sin(deg)*yRef*this.magnitude/dist/dist;
    }
    
    this.disappear = function(){
        this.state = this.states.Dissipated;        
    }
    
    this.update = function(dt){                
        this.updateState(dt);
        
        if(this.state == this.states.Placed){
            //this.velY -= game.gravity*game.gravity/2*dt; //*dt;
        }
        else if(this.state == this.states.Detonated){
            this.velX = 0;
            this.velY = 0;
        }
        
        this.x += this.velX*dt;
        this.y -= this.velY*dt;            
        
    }
    
    this.updateState = function(dt){
        if(this.state == this.states.Placed){
            this.currentTimer -= dt;
            var expRad = (this.currentTimer/(this.plantTimer)*this.plantBaseRadius);            
            this.radius = expRad > this.PlantBaseRadius ? this.PlantBaseRadius : expRad;
            if(this.currentTimer <= 0){
                this.explode();
            }
        }
        else if(this.state == this.states.Detonated){
            this.currentTimer-=dt;
            //console.log((this.explosionMaxRadius-this.explosionBaseRadius)/2 + " " + this.radius);
            this.radius += ((this.explosionMaxRadius-this.explosionBaseRadius)*(dt));
            if(this.currentTimer <= 0){
                this.disappear();
            }
        }  
    }
}