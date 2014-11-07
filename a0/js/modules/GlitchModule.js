var GlitchModule = function () {

	FRAME.Module.call( this );
    
	var width = renderer.domElement.width;
	var height = renderer.domElement.height;

	var camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1000 );

	var scene = new THREE.Scene();
	this.init = function ( parameters ) {
	}
		
	this.start = function ( t, parameters ) {
        //SceneModule1.glitchPass.triggerGlitch();
        SceneModule1.prototype.glitchPass.triggerGlitch();
	};

	this.update = function ( t ) {
	};

};