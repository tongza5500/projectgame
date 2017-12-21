/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	this.bg = this.add.sprite(0,0,"wall");
	this.music = this.add.sound("bachg",1,true);
	this.music.play();
	

	
	var sprite = this.add.sprite(this.world.centerX, this.world.height-100,
			"tabstart");
	sprite.anchor.set(0.5, 0.5);
	sprite.scale.set(1);
	var logo =this.add.sprite(this.world.centerX,this.world.height-600,"hero");
	this.input.onDown.add(this.startGame, this);
	
	logo.scale.set(0.5);
	logo.anchor.set(0.5,0);
	
		this.chef = this.add.sprite(this.world.centerX, this.world.height-170,"dog2");
		this.chef.animations.add("dog2").play(12,true);
		this.chef.anchor.set(0.5,1);
		this.chef.scale.set(1);
		this.chef.smoothed = false;
		
	this.input.onDown.active=true;
	this.input.onDown.add(this.startGame, this);
	};

	function particleBurst(pointer) {

	    //  Position the emitter where the mouse/touch event was
	    emitter.x = pointer.x;
	    emitter.y = pointer.y;

	    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
	    //  The second gives each particle a 2000ms lifespan
	    //  The third is ignored when using burst/explode mode
	    //  The final parameter (10) is how many particles will be emitted in this single burst
	    emitter.start(true, 2000, null, 100);
};

Menu.prototype.startGame = function() {
		this.input.onDown.active = true;
		var tw = this.add.tween(this.chef);
		tw.to({y:0},1000, "Quint.easeInOut",true,0);
		this.time.events.repeat(Phaser.Timer.SECOND * 2, 5, this.startLevel, this);
		sprite.anchor.set(0.5,0.5);
		};

Menu.prototype.startLevel = function() {
	this.game.state.start("story");
	this.music.destroy();
};