/*global window, jQuery, THREE */

SceneModule1 = function () {

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

    this.glitchPath = glitchPass;

    var light1 = new THREE.PointLight( 0x57c6d7, 0, 100 );
    light1.position.x = 110;
    light1.position.y = 50;
    scene.add( light1 );

    var light2 = new THREE.PointLight( 0xe09a20, 0, 110 );
    light2.position.x = -120;
    light2.position.y = 20;
    scene.add( light2 );

    var light3 = new THREE.PointLight( 0xffffff, 0, 500 );
    light3.position.x = 0;
    light3.position.y = 0;
    scene.add( light3 );

    var group = new THREE.Object3D();
    scene.add( group );

    var geometry = new THREE.IcosahedronGeometry( 4, 0 );
    var material = new THREE.MeshLambertMaterial( {
        shading: THREE.FlatShading
    } );

    for ( var i = 0; i < 500; i ++ ) {

        var object = new THREE.Mesh( geometry, material );
        object.position.x = Math.random() * 400 - 100;
        object.position.y = Math.random() * 400 - 100;
        object.position.z = Math.random() * 400 - 100;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        group.add( object );
    }

    var planetGeo = new THREE.CubeGeometry(15,15,15);
    var planetMat = new THREE.MeshLambertMaterial( {
        shading: THREE.NoShading
    } );
    var planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    //

    var startPosition = new THREE.Vector3();
    var endPosition = new THREE.Vector3();
    var deltaPosition = new THREE.Vector3();

    this.start = function ( t, parameters ) {

        startPosition.fromArray( parameters.startPosition );
        endPosition.fromArray( parameters.endPosition );
        deltaPosition.subVectors( endPosition, startPosition );	  
    };

    var glitchcount = 0;

    this.update = function ( t ) {

        camera.position.copy( deltaPosition );
        camera.position.multiplyScalar( t );
        camera.position.add( startPosition );
        camera.lookAt( scene.position );

        if (t > 0.4 && t < 0.95){
            //light1.intensity = Math.max(0, Math.min(5, 5 - 0.6*((t*59.5)%7.43754)));
            //light2.intensity = Math.max(0, Math.min(5, 5 - 0.6*((t*59.5)%7.43754)));
            light1.intensity = Math.max(0, Math.min(5, 5 - 0.6*((t*119)%29.7443)));
            light2.intensity = Math.max(0, Math.min(5, 5 - 0.6*((t*119)%29.7443)));
        }

        if (t > 0.25){
            light3.intensity = Math.max(0, Math.min(0.5, 0.1*((t*7.4375)%1.8593869)));
            planetMat.emissive = new THREE.Color( light3.intensity,light3.intensity,light3.intensity );
        }
        
            planet.position.x = 0;

        for ( var i = 0, l = group.children.length; i < l; i ++ ) {

            var mesh = group.children[ i ];
            var scale = Math.sin( t * 10 + mesh.position.distanceTo( scene.position ) * 0.5 ) + 1;
            mesh.rotation.x = scale * 2;
            mesh.rotation.y = scale;
            mesh.scale.set( scale, scale, scale );
        }





        composer.render();
        //renderer.render( scene, camera );
    };

};