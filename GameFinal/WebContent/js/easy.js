/**
 * Easy state.
 */
function Easy() {
	Phaser.State.call(this);
	// TODO: generated method.
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State.prototype);
Easy.prototype = proto;
Easy.prototype.constructor = Easy;



Easy.prototype.create = function() {
	
	var count = 0;
	var score = 1;
	
		    
	this.bg = this.add.sprite(0,0,"wall");
	//all sound collide
	this.boom = this.add.audio("bomb");
	this.boom.allowMultiple=true;
	this.music = this.add.sound("bachg",3,true);
	this.music.play();
	
	//all sound effect
	this.spider = this.add.audio("spidersound");
	this.spider.allowMultiple=true;
	this.foodS = this.add.audio("getscore");
	this.crash = this.add.audio("scream");
	
	
	
	
	this.foodS.allowMultiple=true;
	
	//score
	this.game.score =1;
	this.gameover=false;
	
	//physics
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	
		
	//Health point function
	this.hp = [];
	for(var i=0; i<3 ; i++)
	{
		this.hp[i] = this.add.sprite(300-(32*i),580,"hp");
	}
	/*this.food.maxHealth = 6;
	this.food.setHealth(3);*/
	
	//food hit
	/*this.food.events.onKilled.addOnce(this.onfoodKilled,this);
	this.food.canhit = true;
	
	//physics movement
	this.physics.enable(this.food,Phaser.Physics.ARCADE);
	this.food.body.collideWorldBounds=true;
	this.food.body.allowGravity.y= 50;
	this.food.body.maxVelocity.setTo(200,200);*/
	
	this.createfly();
	this.createdish();
	this.createfood();
		
	//Add score text
	this.scoreText = this.add.text(10,600,''+this.game.score,{fill:'white'});
	this.scoreText.z=10;
          

    
    this.physics.startSystem(Phaser.Physics.ARCADE);

   // this.physics.arcade.gravity.y = 150;
	
	};

Easy.prototype.createfood = function() {
	this.food =this.add.sprite(140,550,"dog2");
	this.food.anchor.set(0.5,0.5);
	this.food.animations.add("dog2").play(12,true);
	this.food.smoothed=true;
	this.food.scale.set(0.5);
	this.food.inputEnabled = true;
    this.food.input.enableDrag();
    
    this.food.maxHealth = 6;
	this.food.setHealth(3);
	
	this.food.events.onKilled.addOnce(this.onfoodKilled,this);
	this.food.canhit = true;
	
	//physics movement
	this.physics.enable(this.food,Phaser.Physics.ARCADE);
	this.food.body.collideWorldBounds=true;
	this.food.body.allowGravity.y= 50;
	this.food.body.maxVelocity.setTo(200,200);
	
};
	
Easy.prototype.update = function() {
		if(this.gameover)return;	
		
		//movement and fire
		//*this.physics.arcade.collide(this.food,this.world.height-20);
			if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.food.body.acceleration.x=-600;}
		else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.food.body.acceleration.x=600;
		}else{
			this.food.body.velocity.setTo(0,0);
			this.food.body.acceleration.setTo(0,0);
		}
		if (this.input.keyboard.isDown(Phaser.Keyboard.UP)){
			this.food.body.velocity.y =-500;
		}
		if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			this.food.body.velocity.y =+500;
		}
			
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.fireWeapon();
		}
			
	//spider event
	this.flys.forEachAlive(function (a){
		if(a.x > this.world.width) a.x = -Math.random()*300;},this);
	//this.flys.forEachAlive(function (a){
	//if(a.x>this.world.width)a.x=this.createfly();},this);
	
	this.physics.arcade.collide(this.flys,this.food,this.onfoodCollide,null,this);
	
	//this.dishs.forEachAlive(function (d){
		//if(d.x > this.world.height) d.x = -Math.random()*300;},this);
		this.physics.arcade.collide(this.dishs,this.food,this.ondishCollide,null,this);
	
		
//food event	
	if(this.food.canhit){
		 this.physics.arcade.collide(this.flys,this.food,this.onfoodCollide,null,this);
		 }
	if(this.food.canhit){
		 this.physics.arcade.collide(this.dishs,this.food,this.ondishCollide,null,this);
		 }
	//food event lose check  
	if(this.food.health <= 0  ){
		
	    //use pop checklose
	    this.useLpop();
		
////////////VFX START/////////////////
	    this.time.events.repeat(Phaser.Timer.SECOND * 3, 10, this.useLpop, this);
		    
		    
////////////VFX END/////////////////
	}
	
if(this.game.score <= 0  ){
		
	    //use pop checkwin
	    this.useWpop();
		
////////////VFX START/////////////////
	    this.time.events.repeat(Phaser.Timer.SECOND * 3, 10, this.useLpop, this);
		    
////////////VFX END/////////////////
	}
	
	};
Easy.prototype.useLpop = function()	{
		//Pop Up
			this.popup = this.add.sprite(this.world.centerX, this.world.centerY,"poplose");
		 	this.popup.anchor.set(0.5);
		  	
		 var pw = (this.popup.width / 2)-330;
		 var ph = (this.popup.height / 2) -230;
		 
		 	this.closeButton = this.make.sprite(pw, -ph, "btnclose");
		    this.closeButton.inputEnabled = true;
		    this.closeButton.input.priorityID = 1;
		    this.closeButton.events.onInputDown.add(this.quitGame, this);
		    
		    
		       	this.popup.addChild(this.closeButton);//  Add the "close button" to the popup window image
		    	this.popup.scale.set(0);//  Hide it awaiting a click
		    	this.openLWindow();//  Pop the window open
	};   
	
//win 
	
	Easy.prototype.useWpop = function()	{
		//Pop Up
			this.popup = this.add.sprite(this.world.centerX, this.world.centerY,"popwin");
		 	this.popup.anchor.set(0.5);
		  	
		 var pw = (this.popup.width / 2)-330;
		 var ph = (this.popup.height / 2) -230;
		 
		 	this.closeButton = this.make.sprite(pw, -ph, "btnclose");
		    this.closeButton.inputEnabled = true;
		    this.closeButton.input.priorityID = 1;
		    this.closeButton.events.onInputDown.add(this.quitGame, this);
		    
		    
		       	this.popup.addChild(this.closeButton);//  Add the "close button" to the popup window image
		    	this.popup.scale.set(0);//  Hide it awaiting a click
		    	this.openLWindow();//  Pop the window open
	};   

	Easy.prototype.openLWindow = function() { 
		if ((this.tween && this.tween.isRunning) || this.popup.scale.x === 1)
	   {
	       return;
	   }
	    //  Create a tween that will pop-open the window,
		//but only if it's not already tweening or open
	  this.tween = this.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	};
	
//creater monster
Easy.prototype.createfly = function() {
	this.flys = this.add.group(this.game.world,'alien1',false,true,
			Phaser.Physics.ARCADE);
			this.flys.z = 50;
			
		for(var i=0;i<5;i++){
			a = this.flys.create(this.world.randomX, this.world.randomY,"alien1");
			a.animations.add("alien1").play(12,true);
			a.anchor.set(0.5);
			a.scale.set(0.15);
			a.body.velocity.x = 50;
			tw = this.add.tween(a);
			var ny=20+Math.random()*600;
			var nt=Math.random()*1000;
			tw.to({y:ny},1000+nt, "Sine",true,0,Number.MAX_VALUE,true);
			if(Math.random()>0.5) a.body.angularVelocity = 60;
			else a.body.angularVelocity = -60;
			
		
			}
		};

//create dish

Easy.prototype.createdish = function() {
	this.dishs = this.add.group(this.game.world,'key',false,true,
			Phaser.Physics.ARCADE);
	
			//this.dishs.minRotation = 90;
		    //this.dishs.maxRotation = 90;

			d = this.dishs.create(180, 50,"key");
			d.animations.add("key").play(12,true);
			d.anchor.set(0.5);
			d.scale.set(1);
			d.body.velocity.x = 0;
		
		};

		//Crash spider
Easy.prototype.ondishCollide = function(food,dishs){
			//smoke
			//dxp = this.add.sprite(food.x, food.y,"score");
			//dxp.anchor.set(0.5);
			//dxp.animations.add("all",null,7,false).play().killOnComplete=true;
			//food event when crush spider
			//food.damage(1);
	exp.scale.set(0.3);
	exp.anchor.set(0.5);
	exp.animations.add("all",null,12,false).play().killOnComplete=true;
			console.log("hit !!!");
			food.kill();
			this.createfood();
			this.createdish();
			this.game.score--;
			this.scoreText.text=''+this.game.score;
			food.canhit = true;
			food.alpha = 0.1;
			//hp counter 
						
			var twfood = this.add.tween(food);
			twfood.to({alpha:1},200, "Linear",true,0,5);
			
			//twfood.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;}, food);
			
				
			return true;
			};
		
		
//################################################################################
//########DAMAGE##########DAMAGE###############DAMAGEDAMAGEDAMAGEDAMAGE
//################################################################################		
//food Was Killed
Easy.prototype.onfoodKilled = function(food){
	//smoke and foodSound
	//exp = this.add.sprite(food.x, food.y,"score");
	//exp.scale.set(0.3);
	//exp.anchor.set(0.5);
	//exp.animations.add("all",null,12,false).play().killOnComplete=true;
	this.foodS.play();
	
	
	};

//Crash spider
Easy.prototype.onfoodCollide = function(food,fly){
	//smoke
	exp = this.add.sprite(food.x, food.y,"smoke1");
	exp.anchor.set(0.5);
	exp.animations.add("all",null,12,false).play().killOnComplete=true;
	//food event when crush spider
	food.damage(1);
	fly.kill();
	food.canhit = false;
	food.alpha = 0.1;
	this.crash.play();
	//hp counter 
	this.hp[food.health].visible = false;
	var twfood = this.add.tween(food);
	twfood.to({alpha:1},200, "Linear",true,0,5);
	twfood.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;}, food);
	
		
	return true;
	};


Easy.prototype.quitGame=function(){
	this.music.destroy();
	this.game.state.start("Menu");
	
};
