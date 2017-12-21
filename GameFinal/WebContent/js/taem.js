/**
 * taem state.
 */
function taem() {
	Phaser.State.call(this);
	// TODO: generated method.
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State.prototype);
taem.prototype = proto;
taem.prototype.constructor = taem;

taem.prototype.preload = function() {
	// TODO: generated method.
};

taem.prototype.create = function() {
	// TODO: generated method.
	
	this.bg = this.add.sprite(0,0,"t_taem");
	this.createButtons();
};
taem.prototype.createButtons = function() {
	this.btn_t = this.add.button(this.world.width-50,this.world.height-630 ,"back4team");
	this.btn_t.onInputDown.add(this.Gamelevel, this);
	this.btn_t.scale.set(0.3);
	this.btn_t.anchor.set(0.5,0);
	this.btn_t.isdown=false;
};

taem.prototype.update = function() {
	// TODO: generated method.
};
taem.prototype.Gamelevel = function(){
	this.isdown=true;
	
	this.game.state.start("Level");
}