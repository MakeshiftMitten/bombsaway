function roundButton(x, y, radius, type){
    this.x = x;
    this.y = y;
    
    this.radius = radius    
    
    this.type = type;
    
    this.draw = function(){
        if(this.type == game.weapons.Bomb){//this.types.Bomb){
            draw.drawFilledCircle(this.x, this.y, this.radius);
        }
        else if(this.type == game.weapons.Well){//this.types.Well){
            draw.drawCircle(this.x, this.y, this.radius);   
        }
    }
}
