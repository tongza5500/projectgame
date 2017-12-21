/**
 *
 */
function story () {
	Phaser.State.call(this);
	// TODO: generated method.
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
story.prototype = proto;
//story.prototype.constructor = story;

///

story.prototype.preload = function() {
	this.load.pack("story", "assets/assets-pack.json");
};

story.prototype.create = function() {
	this.bg = this.add.sprite(0,0,"wall");
	this.music = this.add.sound("bachg",1,true);
	this.music.play();
	
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"S1");
	this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(0.6);
	
	this.input.onDown.add(this.startGame, this);
	this.time.events.add(2000,this.change,this,"S2");
	this.time.events.add(4000,this.change,this,"S3");
	this.time.events.add(6000,this.change,this,"S4");
	this.time.events.add(8000,this.change,this,"S5");
	this.time.events.add(10000,this.change,this,"S6");
	this.time.events.add(12000,this.startGame,this);
	
};
story.prototype.change = function(k) {
 	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,k);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(0.6);
};
story.prototype.startGame = function() {
this.isdown=true;
	
	this.game.state.start("Level");
};