function meter(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;  
    
    this.orientations = {"Horizontal":0, "Vertical":1};
    
    if(this.type == game.meterTypes.Bomb){
        this.width = 1;
        this.height = 10;
        this.maxLevel = game.players[0].maxBombAmmo;
        this.currentLevel = game.players[0].maxBombAmmo;
        this.orientation = this.orientations.Vertical;
    }
    if(this.type == game.meterTypes.Well){
        this.width = 1;
        this.height = 10;
        this.maxLevel = game.players[0].maxWellAmmo;
        this.currentLevel = game.players[0].maxWellAmmo;
        this.orientation = this.orientations.Vertical;
    }
    if(this.type == game.meterTypes.Life){
        this.width = 1;
        this.height = 10;
        this.maxLevel = game.players[0].maxLife;
        this.currentLevel = game.players[0].maxLife;
        this.orientation = this.orientations.Vertical;
    }
    else if(this.type == game.meterTypes.Level){
        this.width = 40;
        this.height = 2;
        this.maxLevel = game.levelTime;
        this.currentLevel = game.currentLevelTimer;
        this.orientation = this.orientations.Horizontal;
    }
    
    this.update = function(){
        if(this.type == game.meterTypes.Bomb){                        
            this.currentLevel = game.players[0].bombAmmo;
        }
        if(this.type == game.meterTypes.Well){                        
            this.currentLevel = game.players[0].wellAmmo;
        }  
        if(this.type == game.meterTypes.Life){                        
            this.currentLevel = game.players[0].currentLife;
        }  
        else if(this.type == game.meterTypes.Level){            
            
            this.currentLevel = game.currentLevelTimer;
        }
    }
    
    this.draw = function(){
        
        if(this.orientation == this.orientations.Vertical){
            draw.drawRectCentered(this.x, this.y, this.width, this.height, "#000000");
            draw.drawFilledRectCentered(this.x, this.y, this.width, this.height*(this.currentLevel/this.maxLevel), "#000000"); 
        }
        else if(this.orientation == this.orientations.Horizontal){
            draw.drawRectCentered(this.x, this.y, this.width, this.height, "#000000");
            draw.drawFilledRectCentered(this.x, this.y, this.width*(1-this.currentLevel/this.maxLevel), this.height, "#000000");    
        }
        
       
    }
}
