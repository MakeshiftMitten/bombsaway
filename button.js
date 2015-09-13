function roundButton(x, y, radius, type, color){
    this.x = x;
    this.y = y;
    
    this.radius = radius;    
    this.type = type;
    this.color = color;
    
    this.draw = function(){
        if(this.type == game.weapons.Bomb){//this.types.Bomb){
            draw.drawFilledCircle(this.x, this.y, this.radius, game.colors.Bomb);
            if(game.selectedWeapon == game.weapons.Bomb)
                draw.drawCircle(this.x, this.y, this.radius, "#00ff00")
        }
        else if(this.type == game.weapons.Well){//this.types.Well){
            draw.drawFilledCircle(this.x, this.y, this.radius, game.colors.Well);   
            if(game.selectedWeapon == game.weapons.Well)
                draw.drawCircle(this.x, this.y, this.radius, "#00ff00")
        }
    }
}
