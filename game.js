function gameObject(){
    
    //Game Dimensions in Game Units. I think of them as meters, but this is what you will do all of your position updating in. 
    this.gameWidth = 100;
    this.gameHeight = 100; 
    
    //http://www.colourlovers.com/palette/600798/(_t_r_a_v_e_l_e_r_)?widths=0
    //http://www.colourlovers.com/palette/3348506/Interstellar
    //http://www.colourlovers.com/palette/2450686/Space_Age_Love_Song
    //var SpaceAgeLoveSong = {"Background":"#1D0C20", };
    //var Interstellar = {"Background":"  }
    var FloatingInSpace = {"Background":"#5D6F72", "Ship":"#80CCD8", "Enemy":"#CEF5FB", "Bomb":"#343A3B", "Well":"#8AAAAF"}
    
    this.colors = FloatingInSpace;
    
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
    
    //Game Settings
    this.level = 0;
    this.score = 0;
    
    //Set up game object arrays here
    this.clicks = [];
    this.keys = [];
    this.buttons = [];
    this.meters = [];
    this.inputs = [];
    
    this.liveBomb;
    this.liveWell;
    this.bombs = [];
    this.wells = [];
    this.powerups = [];
    
    this.bombMap = [];
    this.floors = [];
    this.players = [];
    this.bots = [];
    this.generators = [];
    
    //Timers
    this.botCooldownTimer = 1;
    this.levelTime = 20;
    this.currentLevelTimer = 0;        
    
    //Game Objects
    this.weapons = {"Bomb":0, "Well":1};
    this.builder = {"BombBot":0, "WellBot":1, "Gravity":2, "BombSpawner":3, "WellSpawner":4};
    this.selectedWeapon = this.weapons.Bomb;
    
    this.meterTypes = {"Level":0, "Bomb":1, "Well":2, "Life":3};    
    this.powerupTypes = {"WellChargeRate": 0, "MaxWellAmmo":1, "BombChargeRate":2, "MaxBombAmmo":3};
    
    this.init = function(){
        //Add a player
        //this.players.push(new player(this.gameWidth/2, this.gameHeight/2));
        this.players.push(new player(this.gameWidth/2, this.gameHeight/2));                             

        //Add a floor
        this.floors.push(new floor(150, 40, 10, 5));

        //Add Some Buttons
        this.buttons.push(new roundButton(this.gameWidth/2+10, this.gameHeight-10, 5, this.weapons.Bomb, "#000000"));
        this.buttons.push(new roundButton(this.gameWidth/2-10, this.gameHeight-10, 5, this.weapons.Well, "#990099"));

        //Add Meters 
        this.meters.push(new meter(this.gameWidth/2 + 17.5, this.gameHeight - 10, this.meterTypes.Bomb));
        this.meters.push(new meter(this.gameWidth/2 - 17.5, this.gameHeight - 10, this.meterTypes.Well));
        this.meters.push(new meter(this.gameWidth/2, this.gameHeight - 10, this.meterTypes.Life));        
        this.meters.push(new meter(this.gameWidth/2, this.gameHeight - 17.5, this.meterTypes.Level));
        

        //Time Stuff
        this.lastTime = Date.now();
        this.nowTime = this.lastTime;
    }
    
    this.levelUp = function(){
        this.level++;
        this.gravity = 0;
        this.currentLevelTimer = this.levelTime;
        this.bots = [];
        this.generators = [];
        this.powerups = [];
        this.players[0].moveSpeed += .5;
        if(this.level == 2){
            this.levelTime = 10;
            this.currentLevelTimer = this.levelTime;
            game.bots.push(new bot(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4, 2,2, .5, 10, 2,game.weapons.Bomb));   
        }
        if(this.level == 3){
            this.gravity = 2;   
        }
        if(this.level == 4){
            this.gravity = 2;
            game.bots.push(new bot(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4, 2,2, .5, 10, 2,game.weapons.Well));   
        }
        if(this.level > 4 && this.level < 8){
            var numBombBots = Math.floor(Math.random() * 3 +1);
            var numWellBots = Math.floor(Math.random() * 3 +1);
            var gravity = Math.floor(Math.random() * 3);
            this.gravity = gravity;
            for(var x = 0; x < numBombBots; x++){                
            game.bots.push(new bot(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4, 2,2, .5, 10, 2,game.weapons.Bomb));
            }
            for(var x = 0; x < numWellBots; x++){                
            game.bots.push(new bot(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4, 2,2, .5, 10, 2,game.weapons.Well));
            }
        }
        if(this.level == 8){
            game.levelTime = 30;
            this.currentLevelTimer = this.levelTime;
            game.generators.push(new shipGenerator(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4 , 3, 3, 5, this.weapons.Bomb));
        }
        
        if(this.level == 9){
            game.gravity = 3;
            game.generators.push(new shipGenerator(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4 , 3, 3, 5, this.weapons.Well));
        }
        
        if(this.level > 9){
            game.levelTime = 3*this.level;
            this.currentLevelTimer = this.levelTime;
            var points = 0;
            while (points < this.level){
                var draw = Math.floor(Math.random() * 5);
                if(draw == this.builder.BombBot){
                     game.bots.push(new bot(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4, 2,2, .5, 10, 2,game.weapons.Bomb));   
                    points += 1;
                }
                if(draw == this.builder.WellBot){
                     game.bots.push(new bot(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4, 2,2, .5, 10, 2,game.weapons.Well));   
                    points += 1;
                }
                if(draw == this.builder.Gravity){
                     this.gravity += 1  
                    points += 2;
                }
                if(draw == this.builder.WellSpawner){
                     game.generators.push(new shipGenerator(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4 , 3, 3, 5, this.weapons.Bomb));  
                    points += 5;
                }
                if(draw == this.builder.WellBot){
                     game.generators.push(new shipGenerator(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4 , 3, 3, 5, this.weapons.Well)); 
                    points += 5;
                }
            }
        }
            
    }
    /*
        game.generators.push(new shipGenerator(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4 , 3, 3, 5, this.weapons.Bomb));
        game.generators.push(new shipGenerator(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4 , 3, 3, 5, this.weapons.Well));
        */
         
        
}