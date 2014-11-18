/*global window, jQuery, THREE */

SceneModule3 = function () {

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

    glitchPass.renderToScreen = true;
    composer.addPass( glitchPass );

    /*var light1 = new THREE.PointLight( 0x57c6d7, 5, 100 );
    light1.position.x = 90;
    light1.position.y = 50;
    scene.add( light1 );

    var light2 = new THREE.PointLight( 0xe09a20, 5, 110 );
    light2.position.x = -90;
    light2.position.y = 50;
    scene.add( light2 );

    var light3 = new THREE.PointLight( 0xffffff, 500, 0 );
    light3.position.z = -10000;
    light3.position.x = 0;
    light3.position.y = 10000;
    scene.add( light3 );*/

    var stars = new THREE.Object3D();
    scene.add( stars );

    var bigStars = new THREE.Object3D();
    scene.add( bigStars );

    var starGeo = new THREE.SphereGeometry( 1.5, 10,10 );
    var material = new THREE.MeshPhongMaterial( {
        emissive: 0xffffff
    } );

    for ( var i = 0; i < 5000; i ++ ) {

        var object = new THREE.Mesh( starGeo, material );
        object.position.x = Math.random()*1200;
        object.position.y = Math.random()*1200;
        object.position.z = Math.random()*1200;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        stars.add( object );
    }

    for ( var i = 0; i < 100; i ++ ) {

        var object = new THREE.Mesh( starGeo, material );
        object.position.x = Math.random()*800;
        object.position.y = Math.random()*800;
        object.position.z = Math.random()*800;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        bigStars.add( object );
    }

    var planetGeo = new THREE.CubeGeometry(100,100,100);
    var planetMat = new THREE.MeshPhongMaterial( {
        shading: THREE.FlatShading,
        emissive: 0xffffff
    } );
    var planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);
    planet.position.x = 600;
    planet.position.y = 380;
    planet.position.z = 850;

    //

    var startPosition = new THREE.Vector3();
    var endPosition = new THREE.Vector3();
    var deltaPosition = new THREE.Vector3();

    this.start = function ( t, parameters ) {

        startPosition.fromArray( parameters.startPosition );
        endPosition.fromArray( parameters.endPosition );
        deltaPosition.subVectors( endPosition, startPosition );
        glitchPass.triggerGlitch(10);

        for (var i = 0, l = bigStars.children.length; i < l; i++){
            var mesh = bigStars.children[ i ];

            var scale = Math.floor(Math.random() * (2 - 0.5 + 1)) + 0.5;
            mesh.scale.set( scale, scale, scale );
        }

        for ( var i = 0, l = stars.children.length; i < l; i ++ ) {

            var mesh = stars.children[ i ];
            var scale = 0.25;
            mesh.scale.set( scale, scale, scale );
        }
    };

    this.update = function ( t ) {

        camera.position.copy( deltaPosition );
        camera.position.multiplyScalar( t );
        camera.position.add( startPosition );
        camera.lookAt( scene.position );

        for (var i = 0, l = bigStars.children.length; i < l; i++){
            var mesh = bigStars.children[ i ];
            //var scale = Math.cos((t*(119/120))*100)+2;
            //var scale = Math.max(0, Math.min(5, 5-((t*119)%14.875)));
            var scale = Math.max(0.8, Math.min(2, 2 - 0.1*((t*119*9*2)%119/9*1.8)));
            //mesh.rotation.x = Math.sin(t*25);
            //mesh.rotation.y = scale;
            mesh.scale.set( scale, scale, scale );
        }

        composer.render();
    };

};