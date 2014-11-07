/*global window, jQuery, THREE */

SceneModule2 = function () {

    FRAME.Module.call( this );

    this.parameters.input = {

        startPosition: [100, 100, 100],
        endPosition: [-100, 100, 100]

    };

    var width = renderer.domElement.width;
    var height = renderer.domElement.height;

    var camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1000 );

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 1000);

    //Post Processing
    var composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) );

    glitchPass = new THREE.GlitchPass();
    glitchPass.renderToScreen = true;
    composer.addPass( glitchPass );
    glitchPass.triggerGlitch(10);

    this.glitchPath = glitchPass;

    var light1 = new THREE.PointLight( 0x57c6d7, 5, 100 );
    light1.position.x = 90;
    light1.position.y = 50;
    scene.add( light1 );

    var light2 = new THREE.PointLight( 0xe09a20, 5, 110 );
    light2.position.x = -90;
    light2.position.y = 50;
    scene.add( light2 );

    var light3 = new THREE.PointLight( 0xffffff, 5, 5000 );
    light3.position.x = 0;
    light3.position.y = 0;
    scene.add( light3 );
    
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    var stars = new THREE.Object3D();
    scene.add( stars );

    var geometry = new THREE.SphereGeometry( 1.5, 10,10 );
    var material = new THREE.MeshLambertMaterial( {
        shading: THREE.FlatShading
    } );

    for ( var i = 0; i < 5000; i ++ ) {

        var object = new THREE.Mesh( geometry, material );
        object.position.x = Math.random()*1000;
        object.position.y = Math.random()*1000;
        object.position.z = Math.random()*1000;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        stars.add( object );
    }

    //

    var startPosition = new THREE.Vector3();
    var endPosition = new THREE.Vector3();
    var deltaPosition = new THREE.Vector3();

    this.start = function ( t, parameters ) {

        startPosition.fromArray( parameters.startPosition );
        endPosition.fromArray( parameters.endPosition );
        deltaPosition.subVectors( endPosition, startPosition );	  
    };
    
    this.update = function ( t ) {

        camera.position.copy( deltaPosition );
        camera.position.multiplyScalar( t );
        camera.position.add( startPosition );
        camera.lookAt( scene.position );

        for ( var i = 0, l = stars.children.length; i < l; i ++ ) {

            var mesh = stars.children[ i ];
            var scale = 0.25;
            mesh.rotation.x = Math.sin(t*25);
            mesh.rotation.y = scale;
            mesh.scale.set( scale, scale, scale );
        }
        composer.render();
        //renderer.render( scene, camera );
    };

};