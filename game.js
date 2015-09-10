function gameObject(){
    
    //Game Dimensions in Game Units. I think of them as meters, but this is what you will do all of your position updating in. 
    this.gameWidth = 100;
    this.gameHeight = 100;        
    
    //Canvas Context for easy referencing
    this.Canvas = document.getElementById('gameCanvas');
    this.ctx = this.Canvas.getContext("2d"); 
    
    this.isMobile = function(){         
    if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         ){
            return true;
            }
         else {
            return false;
          }
    }
    
    //Physics Variables
    //this.gravity = 10;
    this.gravity = 10;
    
    //Set up game object arrays here
    this.clicks = [];
    this.keys = [];
    this.inputs = [];
    this.bombs = [];
    this.bombMap = [];
    this.floors = [];
    this.players = [];
    
    //Add a player
    //this.players.push(new player(this.gameWidth/2, this.gameHeight/2));
    this.players.push(new player(this.gameWidth/2, 10));
    
    //Add a floor
    this.floors.push(new floor(50, 40, 50, 5));
                     
    //Time Stuff
    this.lastTime = Date.now();
    this.nowTime = this.lastTime;
}