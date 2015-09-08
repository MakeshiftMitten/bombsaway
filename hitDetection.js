function playerFloorHit(player, floor)
{
    var isVerticalCollision = false;
    var isHorizontalCollision = false;
    player.printSides();    
    floor.printSides();
    if((player.bottom() > floor.top() && player.bottom() < floor.bottom()) ||
       (player.top() < floor.bottom() && player.top() > floor.top()))    
         isVerticalCollision = true;               
    if((player.left() < floor.right() && player.left() > floor.left()) ||
        (player.right() > floor.left() && player.right() < floor.right()))
        isHorizontalCollision = true;        

    return isVerticalCollision&&isHorizontalCollision;
}
                
function rectangleHitCircle(rectangle, circle){
    
    console.log("player: "+rectangle.width + " this.right " + rectangle.right + rectangle.height);    
}
                
function rectangleHitRectangle(rectangle, rectangle){
    rectangle.printSides();
}
    
function circleHitCircle(circle, circle)
{
        
}