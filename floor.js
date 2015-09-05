function floor(x, y, width, height){
    this.x = x;
    this.y = y;
    
    this.width = width;
    this.height = height;
    
    
    this.draw = function(){
        drawRectCentered(this.x, this.y, this.width, this.height);      
    }
}
