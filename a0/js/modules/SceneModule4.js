/*global window, jQuery, THREE */

SceneModule4 = function () {

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

    /*var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);*/

    var stars = new THREE.Object3D();
    scene.add( stars );

    var bigStars = new THREE.Object3D();
    scene.add( bigStars );

    var starGeo = new THREE.SphereGeometry( 1.5, 10,10 );
    /*var material = new THREE.MeshLambertMaterial( {
        shading: THREE.SmoothShading
    } );*/

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
    planet.position.x = 450;
    planet.position.y = 340;
    planet.position.z = 850;

    //

    var startPosition = new THREE.Vector3();
    var endPosition = new THREE.Vector3();
    var deltaPosition = new THREE.Vector3();

    this.start = function ( t, parameters ) {

        startPosition.fromArray( parameters.startPosition );
        endPosition.fromArray( parameters.endPosition );
        deltaPosition.subVectors( endPosition, startPosition );
        glitchPass.triggerGlitch(15);

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

    var scaleBigStars = 1;

    this.update = function ( t ) {

        camera.position.copy( deltaPosition );
        camera.position.multiplyScalar( t );
        camera.position.add( startPosition );
        camera.lookAt( endPosition );

        for (var i = 0, l = bigStars.children.length; i < l; i++){
            var bigStarsMesh = bigStars.children[ i ];

            if(t > 0.11 && t < 0.12 || t > 0.235 && t < 0.25 || t > 0.36 && t < 0.37 || t > 0.48 && t < 0.5 || t > 0.61 && t < 0.62 || t > 0.735 && t < 0.75 || t > 0.86 && t < 0.87)
                scaleBigStars = 0.8;
            else if (t > 0.97 && t < 0.975){
                scaleBigStars = Math.floor(t*3);
            }
            else if (t > 0.975 && t < 0.98){
                scaleBigStars = Math.floor(t*6);
            }
            else if (t > 0.98 && t < 0.985){
                scaleBigStars = Math.floor(t*9);
            }
            else if (t > 0.985 && t < 1){
                scaleBigStars = Math.floor(t*12);
            }
            else
                scaleBigStars = Math.max(0.8, Math.min(2, 2 - 0.1*((t*119*36*2)%119/9*1.8)));

            bigStarsMesh.scale.set( scaleBigStars, scaleBigStars, scaleBigStars );
        }

        for ( var i = 0, l = stars.children.length; i < l; i ++ ) {
            if (t > 0.97 && t < 0.975){
                var mesh = stars.children[ i ];
                var scale = 0.4;
                mesh.scale.set( scale, scale, scale );
            }
            else if (t > 0.975 && t < 0.98){
                var mesh = stars.children[ i ];
                var scale = 0.5;
                mesh.scale.set( scale, scale, scale );
            }
            else if (t > 0.98 && t < 0.985){
                var mesh = stars.children[ i ];
                var scale = 0.6;
                mesh.scale.set( scale, scale, scale );
            }
            else if (t > 0.985 && t < 0.986){
                var mesh = stars.children[ i ];
                if (Math.random() > 0.7){
                    if (mesh.scale.x != 0.25 ||mesh.scale.x != 1)
                        mesh.scale.set( 0.25,0.25,0.25 );
                }
                else mesh.scale.set(0.00000001,0.00000001,0.00000001);
            }
        }
        planet.rotation.x = Math.cos(t*1.2);
        planet.rotation.y = Math.cos(t*2);
        planet.rotation.z = Math.cos(t*1.5);

        if (t > 0.97 && t < 0.975){
            planet.position.z = -t * 350 + 700;
        }
        else if (t > 0.975 && t < 0.98){
            planet.position.z = -t * 350 + 400;
        }
        else if (t > 0.98 && t < 0.985){
            planet.position.z = -t * 350 + 200;
        }
        else if (t > 0.985 && t < 0.986){
            planet.position.z = -t * 350 - 500;
        }
        else if (t > 0.986)
            planet.position.z = -t * 350 - 500;
        else planet.position.z = -t * 350 + 800;

        composer.render();
    };

};