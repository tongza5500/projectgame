function Level() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level.prototype = proto;


Level.prototype.create = function() {
	this.bg = this.add.sprite(0,0,"wall");
	this.createButtons();
	    emitter = this.add.emitter(0, 0, 100);
	    emitter.makeParticles('star');
	    emitter.gravity = 250;

	    this.input.onDown.add(particleBurst, this);
	};
	function particleBurst(pointer) {

	    //  Position the emitter where the mouse/touch event was
	    emitter.x = pointer.x;
	    emitter.y = pointer.y;

	    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
	    //  The second gives each particle a 2000ms lifespan
	    //  The third is ignored when using burst/explode mode
	    //  The final parameter (10) is how many particles will be emitted in this single burst
	    emitter.start(true, 2000, null, 20);
};
Level.prototype.createButtons = function() {
	this.btn_ez = this.add.button(this.world.centerX,this.world.height-600 ,"ez_button");
	this.btn_ez.onInputDown.add(this.menuEasyGame, this);
	this.btn_ez.scale.set(1);
	this.btn_ez.anchor.set(0.5,0);
	this.btn_ez.isdown=false
	
	this.btn_hd = this.add.button(this.world.width-170,this.world.height-400,"hd_button");
	this.btn_hd.onInputDown.add(this.menuHardGame, this);
	this.btn_hd.scale.set(1);
	this.btn_hd.anchor.set(0.5,0);
	
	this.btn_t = this.add.button(this.world.width-170,this.world.height-200,"buttonteam");
	this.btn_t.onInputDown.add(this.menuTeam, this);
	this.btn_t.scale.set(1);
	this.btn_t.anchor.set(0.5,0);
	
};
Level.prototype.menuEasyGame = function(){
	this.isdown=true;
	
	this.game.state.start("easy");
};
	
Level.prototype.menuHardGame = function(){
	
	this.game.state.start("hard");
};

Level.prototype.menuTeam = function(){
	
	this.game.state.start("taem");
};




