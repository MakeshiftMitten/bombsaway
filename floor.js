function floor(x, y, width, height){
    this.x = x;
    this.y = y;    
    
    this.width = width;
    this.height = height;
    
    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y - this.height/2};
    this.bottom = function(){return this.y + this.height/2};
    
    this.printSides = function(){
        console.log("Floor Right: " + this.right() + " Left: " + this.left() + " Top" + this.top() + " Bottom" + this.bottom());
    }
    
    this.draw = function(){
        drawRectCentered(this.x, this.y, this.width, this.height);  
    }    
}