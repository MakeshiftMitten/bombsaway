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
    this.gravity = 0;
    
    //Set up game object arrays here
    this.clicks = [];
    this.keys = [];
    this.buttons = [];
    this.inputs = [];
    
    this.liveBomb;
    this.liveWell;
    this.bombs = [];
    this.wells = [];
    
    this.bombMap = [];
    this.floors = [];
    this.players = [];
    this.bots = [];
    
    //Timers
    this.botCooldownTimer = 1;
    
    //Game Objects
    this.weapons = {"Bomb":0, "Well":1};
    this.selectedWeapon = this.weapons.Bomb;
    
    //Add a player
    //this.players.push(new player(this.gameWidth/2, this.gameHeight/2));
    this.players.push(new player(this.gameWidth/2, this.gameHeight/2));
    
    //Add a floor
    this.floors.push(new floor(150, 40, 10, 5));
    
    //Add Some Buttons
    this.buttons.push(new roundButton(10, this.gameHeight-10, 5, this.weapons.Bomb, "#000000"));
    this.buttons.push(new roundButton(this.gameWidth-10, this.gameHeight-10, 5, this.weapons.Well, "#990099"));
                     
    //Time Stuff
    this.lastTime = Date.now();
    this.nowTime = this.lastTime;
}