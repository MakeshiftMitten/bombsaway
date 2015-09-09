function bomb(x, y, velX, velY, destX, destY){
    this.x = x;
    this.y = y;
    
    var slopeTop= destY - y;
    var slopeBottom = destX - x;
    var slope = slopeTop/slopeBottom;
    
    var deg = Math.atan(Math.abs(slopeTop/slopeBottom));    
    var dist = Math.sqrt((y-destY)*(y-destY) + (x-destX)*(x-destX));    

    var xRef = (destX-x)/Math.abs(destX-x);
    var yRef = -(destY-y)/Math.abs(destY-y);
    
    this.velX = Math.cos(deg)*dist*xRef*2;
    this.velY = Math.sin(deg)*dist*yRef*2;
        
    this.radius = .5;
    
    //Timers and Radii
    this.plantTimer = .5;
    this.plantBaseRadius = this.radius;
    
    this.explodeTimer = .5;
    this.explosionBaseRadius = .5;
    this.explosionMaxRadius = 1;
    
    //Start in the plant state
    this.states = {"Placed":0, "Detonated":1, "Dissipated":2};
    this.state = this.states.Placed;
    this.currentTimer = this.plantTimer;    
    
    this.draw = function(){
        //drawRectCentered(this.x, this.y, 10, 10);
        
        if(this.state == this.states.Placed)
        {
            drawCircle(this.x, this.y, this.radius);
            drawText(this.x, this.y, "BEZIER CURVE$15 SPECIAL");
        }        
        else if(this.state  == this.states.Detonated)
        {
            drawFilledCircle(this.x, this.y, this.radius);
            drawText(this.x, this.y, "GIVE ME YOUR MONEY");
        }
    }
    
    this.explode = function(){        
        this.state = this.states.Detonated;
        this.currentTimer = this.plantTimer;
        this.radius = this.explosionBaseRadius;
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