/*global window, jQuery, THREE */

SceneModule7 = function () {

    FRAME.Module.call( this );

    this.parameters.input = {

        startPosition: [100, 100, 100],
        endPosition: [-100, 100, 100]

    };

    var width = renderer.domElement.width;
    var height = renderer.domElement.height;

    var camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1000 );

    var scene = new THREE.Scene();
    //scene.fog = new THREE.Fog(0x000000, 1, 1000);

    //Post Processing
    var composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) );

    glitchPass.renderToScreen = true;
    composer.addPass( glitchPass );

    this.glitchPath = glitchPass;

    var group = new THREE.Object3D();
    scene.add( group );

    //var geometry = new THREE.IcosahedronGeometry( 4, 0 );
    var geometry = new THREE.CubeGeometry( 4, 4, 4 );
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    } );

    for ( var i = 0; i < 1000; i ++ ) {

        var object = new THREE.Mesh( geometry, material );
        object.visible = false;
        object.position.x = Math.random() * 700-200;
        object.position.y = Math.random() * 700-100;
        object.position.z = Math.random() * 700-200;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        group.add( object );

        var cubeWireframe = new THREE.EdgesHelper( object, 0x000000 );
        group.add( cubeWireframe );
    }

    var planetGeo = new THREE.SphereGeometry(700,32);
    var planetMat = new THREE.MeshPhongMaterial( {
        shading: THREE.NoShading,
        side: THREE.DoubleSide
    } );
    var planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);
    
    var heartGeo = new THREE.CubeGeometry(16,16,16);
    var heartMat = new THREE.MeshPhongMaterial( {
        shading: THREE.NoShading,
        side: THREE.DoubleSide
    } );
    var heart = new THREE.Mesh(heartGeo, heartMat);
    scene.add(heart);

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
    
    planetMat.emissive = new THREE.Color( 6,6,6 );

    var scale = 0.5;
    var heartScale = 0;
    this.update = function ( t ) {
        camera.position.copy( deltaPosition );
        camera.position.multiplyScalar( t );
        camera.position.add( startPosition );
        camera.lookAt( scene.position );

        planet.position = camera.position;

        for ( var i = 0, l = group.children.length; i < l; i ++ ) {
            var mesh = group.children[ i ];
            if (i > l/2){
                mesh.rotation.x = Math.cos(t%119*32) * scale;
                scale = Math.max(0.5, Math.min(2, 2 - 0.1*(((t+0.1)*119*32*0.5)%119/32*1.8)));
                mesh.rotation.z = scale+l-i;
            }
            else {
                scale = Math.max(0.5, Math.min(2, 2 - 0.1*(((t+0.1)*119*32*1)%119/32*1.8)));
                mesh.rotation.y = scale+i-l;
            }
            mesh.scale.set( scale, scale, scale );
        }
        
        heartScale = Math.max(0, Math.min(64, ((t*119)%119/32*3)));
        heart.scale.set(heartScale, heartScale, heartScale);
        composer.render();
    };

};