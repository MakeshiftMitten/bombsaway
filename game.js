function gameObject(){
    
    //Game Dimensions in Game Units. I think of them as meters, but this is what you will do all of your position updating in. 
    this.gameWidth = 50;
    this.gameHeight = 50;    
    
    //Canvas Context for easy referencing
    this.Canvas = document.getElementById('gameCanvas');
    this.ctx = this.Canvas.getContext("2d"); 
    
    //Set up game object arrays here
    this.clicks = [];
    this.keys = [];
    this.bombs = [];
    this.bombMap = [];
    this.floors = [];
    this.players = [];
    
    //Add a player
    this.players.push(new player(this.gameWidth/2, this.gameHeight/2));
    
    //Add a floor
    this.floors.push(new floor(0, 50, 100, 10));
                     
    //Time Stuff
    this.lastTime = Date.now();
    this.nowTime = this.lastTime;
}