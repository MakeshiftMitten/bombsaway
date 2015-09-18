function well(x, y, velX, velY, destX, destY, shotSpeed){
    
    
    var slopeTop= destY - y;
    var slopeBottom = destX - x;
    var slope = slopeTop/slopeBottom;
    
    var deg = Math.atan(Math.abs(slopeTop/slopeBottom));    
    var dist = Math.sqrt((y-destY)*(y-destY) + (x-destX)*(x-destX));    

    var xRef = (destX-x)/Math.abs(destX-x);
    var yRef = -(destY-y)/Math.abs(destY-y);
    
    this.shotSpeed = shotSpeed;
    
    this.velX = velX + Math.cos(deg)*xRef*this.shotSpeed;
    this.velY = velY + Math.sin(deg)*yRef*this.shotSpeed;
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
    
    this.standingTimer = 5;
    
    //Start in the plant state
    this.states = {"Placed":0, "Detonated":1, "Standing":2, "Dissipated":3};
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
            draw.drawCircle(this.x, this.y, this.radius);            
        }
        else if(this.state  == this.states.Standing)
        {
            draw.drawFilledCircle(this.x, this.y, this.radius, game.colors.Well);            
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
        console.log(dist);
        
        //var xRef = (player.x - this.x)/Math.abs(player.x - this.x);
        //var yRef = -(player.y - this.y)/Math.abs(player.y - this.y);
        
        //game.players[0].velX += Math.cos(deg)*xRef*this.magnitude/dist;
        //game.players[0].velY += Math.sin(deg)*yRef*this.magnitude/dist;
        
        game.wells.push(this);
    }
    
    this.stand = function(){
        this.state = this.states.Standing;
        this.currentTimer = this.standingTimer;
        
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
            
            if(this.currentTimer > 0){
                this.radius += ((this.explosionMaxRadius-this.explosionBaseRadius)*(dt));
            }
            if(this.currentTimer <= 0){
                this.stand();
            }
        }  
        else if(this.state == this.states.Standing){
            this.currentTimer-=dt;
                        
            if(this.currentTimer <= 0){
                this.disappear();
            }
        }  
    }
}