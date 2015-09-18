# bombsaway
jk13k 2015 Entry

Play the contest entry at http://js13kgames.com/entries/bombs-away and retweet/like/g+!

<h3>ADDITIONAL INSTRUCTIONS:</h3>

- Bombs and Wells: clicking will shoot a bomb/well. The farther from your ship you click, the bigger/more powerful the bomb will be. 
- Levels: the first level is a sandbox, not the whole game! It's also way too long by poor design. The first few levels attempt to introduce enemies and concepts, before you get turned loose against ever-increasing odds. 
- Weapon Select: Mouse wheel OR touch the corresponding button down below

<h3>CONTEST POST-MORTEM</h3>

This was my first solo entry for the contest starting completely from scratch. I did a lot of things better than I expected, and I certainly fell short on quite a few. 


<h4>What Went Well: </h4>

Mechanics: For the most part, the mechanics work about as well as I could have hoped for given the total amount of time spent on them. The bombs, once you get the hang of them, are fun and useful. The wells, though harder to incorporate, get much more useful as gravity increases as they directly counter it. The enemy spawners work pretty well. 

One thing I wish I could have spent more time on was basic enemy AI. The bombers should have been able to calculate some trajectories to keep themselves off the walls, and ideally a set of bots should have worked to protect their spawner. An intelligent bot-spawner swarm could make for a really hellish, fun level.

Framework: I loosely based my framework on my first JS13K entry, a physics based ship game, which was all built in one mangled JS file. Yeah, it was my first effort. Yuck. This time, up until the final crunch, I kept my code relatively clean and maintainable. Once the contest is done, I'll probably go back and clean it up a bit. I think I've finally settled on a general 2d method for putting together HTML5 games. It lacks the ability to do sound and multiplayer for now, but I can iron that out over the winter and come back with a much stronger concept for next year. 

One thing that was especially helpful was working only in Game Units for distances. After I got the game window scaling properly for desktop and mobile, I abstracted all of my primitive draw methods out to take Game Units and do the conversions internally, so once I set up a particular primitive I didn't need to ever worry about scaling again. Except with my text, which looks terrible on a small screen because, well, I was tired and forgot to test it. Working in game units also made it very easy to set up the physics equations, because I could treat every game unit as a meter. 

I also abstracted out a lot of features for building the game, even if they aren't showcased that way in the final product -  I have three color pallettes I can swap with a key press in game(removed for release), and my camera is the same way, although the player-centric camera is hopelessly broken/ignored in the spirit of finishing. The game is also fairly capable of handling two players, but again - ran out of time. 


<h4>What Could Be Improved:</h4>

Scope: I tried to do A LOT with this game, and probably bit off more than I could chew. I waited until the very last minute to put together the level system, and as a result, well, it looks like I tried to pull an all nighter and THEN try to build a level system! Timer doesn't work, enemies spawn in a clunky manner, often killing themselves before you can get to them, and levels switch too quickly, eating up your hard earned(ha) powerups before you can get to them. 

Learning ingame: This fell flat on its face. What was supposed to be a series of introductory levels turned into a 30 second lag at the start of every match, which, combined with the not-so-intuitive and poorly explained controls resulted in the only streamer I saw try it quitting almost immediately. Not their fault: the game was almost painful to watch, especially knowing how much content was behind the UX wall.

UX: This was my biggest failure. The UX was awful. Terrible. All the mechanics in the world could not have saved it. It looked clunky, it felt clunky, and it didn't bite into the player and make them want more. I would have been better off starting iwth a level loop and building every more complicated enemies than the other way around. 


<h4>What I Want For Next Year:</h4>

Sound: I think simple sound for the bombs/enemy death could really make them pop. The entries that did sound certainly have a leg up.

Art: It's gotta be better. Circles and Squares don't cut it.

User Experience: I really want the player to open my game and get hyped up. That's why we're doing this, right?

Multiplayer: I ran out of time so I couldn't add MP functionality, but that's something I want next year as well. 

Start Earlier: I was very light on work until the last week. I want to set a hard goal of 'no commits in the final 12 hours' next year and really push myself to use all the time available. 




