/*global window, jQuery, THREE */

SceneModule5 = function () {

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

    var light = new THREE.PointLight( 0x00b4ff, 5, 350 );
    light.position.x = 900;
    light.position.y = 500;
    light.position.z = 800;
    scene.add(light);

    var light1 = new THREE.PointLight( 0xffb400, 5, 350 );
    light1.position.x = 100;
    light1.position.y = 500;
    light1.position.z = 900;
    scene.add(light1);

    var light2 = new THREE.PointLight( 0xff9000, 1, 300 );
    light2.position.x = 400;
    light2.position.y = 550;
    light2.position.z = 500;
    scene.add(light2);

    var light3 = new THREE.PointLight( 0x00fff6, 1, 250 );
    light3.position.x = 600;
    light3.position.y = 500;
    light3.position.z = 500;
    scene.add(light3);

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

    for ( var i = 0; i < 4000; i ++ ) {

        var object = new THREE.Mesh( starGeo, material );
        object.position.x = Math.random()*1300;
        object.position.y = Math.random()*1300;
        object.position.z = Math.random()*1300;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        stars.add( object );
    }

    for ( var i = 0; i < 100; i ++ ) {

        var object = new THREE.Mesh( starGeo, material );
        object.position.x = Math.random()*1500;
        object.position.y = Math.random()*1500;
        object.position.z = Math.random()*1500;
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
    planet.position.x = 500;
    planet.position.y = 550;
    planet.position.z = 500;
    planet.rotation.x = 75;
    planet.rotation.y = 75;
    planet.rotation.z = 75;

    var things = new THREE.Object3D();
    scene.add( things );

    var thing = new THREE.IcosahedronGeometry( 5, 0 );
    var thingMaterial = new THREE.MeshPhongMaterial( {
        //emissive: 0xffffff
        shading: THREE.FlatShading
    } );

    var thingsNumber = 1000;

    for ( var i = 0; i < thingsNumber; i ++ ) {

        var object = new THREE.Mesh( thing, thingMaterial );
        object.position.x = Math.cos(i / thingsNumber * Math.PI * 4*2*Math.PI)*200+500;
        object.position.y = Math.sin(i / thingsNumber * Math.PI * 8)*100+500;
        object.position.z = Math.sin(i / thingsNumber * Math.PI * 9*3)*200+600;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        things.add( object );
    }


    //

    var startPosition = new THREE.Vector3();
    var endPosition = new THREE.Vector3();
    var deltaPosition = new THREE.Vector3();

    this.start = function ( t, parameters ) {

        startPosition.fromArray( parameters.startPosition );
        endPosition.fromArray( parameters.endPosition );
        deltaPosition.subVectors( endPosition, startPosition );
        glitchPass.triggerGlitch(20);

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
    
    var targetPosition = new THREE.Vector3();
    targetPosition.x = 500;
    targetPosition.y = 600;
    targetPosition.z = 400;

    this.update = function ( t ) {

        camera.position.copy( deltaPosition );
        camera.position.multiplyScalar( t );
        camera.position.add( startPosition );
        camera.lookAt( targetPosition );

        /*for (var i = 0, l = bigStars.children.length; i < l; i++){
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
        }*/
        
        for (var i = 0, l = things.children.length; i<l;i++){
            var mesh = things.children[i];
            mesh.rotation.x = Math.cos((1+i)*3+t*2)*5;
            mesh.rotation.y = Math.sin((1+i)*3+t*2)*2;
            var newScale = Math.sin(-i*50+10*t);
            mesh.scale.x = newScale;
            mesh.scale.y = newScale;
            mesh.scale.z = newScale;
        }

       /* for ( var i = 0, l = stars.children.length; i < l; i ++ ) {
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
        }*/

        //light.position.x = Math.cos(t*119)*400+900;
        //light1.position.x = Math.cos(t*119)*400+100;
        //light2.position.x = Math.cos(t*119/4)*400+400;
        //light3.position.x = Math.cos(t*119/4)*400+600;
        
        planet.rotation.x = Math.cos(t*2)+74.72;
        planet.rotation.y = Math.cos(t*4)+76.08;
        planet.rotation.z = Math.cos(t*1.5)+75.5;

        light.position.x = Math.sin( t * 5 ) * 100+200;
        light1.position.x = Math.sin( t * 5 ) * 100+700;
        light2.position.x = Math.sin( t * 10 ) * 100+400;
        light3.position.x = Math.sin( t * 10 ) * 100+600;

        composer.render();
    };

};