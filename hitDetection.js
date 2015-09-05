function playerFloorHit(player, floor)
{
    if(player.y-player.height > floor.y - floor.height)
        return true;
    return false;
}