/*global window, jQuery, THREE */

var renderer = new THREE.WebGLRenderer({atialias: true});
renderer.setSize(window.innerWidth,
                 window.innerHeight);

renderer.setClearColorHex(0xEEEEEE, 1.0);
renderer.clear();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
camera.position.z = 300;

var scene = new THREE.Scene();

function animate(t){
    camera.position.x = Math.sin(t/1000)*300;
    camera.position.y = 150;
    camera.position.z = Math.cos(t/1000)*300;
    camera.lookAt(scene.position);
    renderer.render(scene,camera);
    
    litCube.position.x = Math.cos(t/600)*85;
    litCube.position.y = 60 - Math.sin(t/900)*25;
    litCube.position.z = Math.sin(t/600)*85;
    litCube.rotation.x = t/500;
    litCube.rotation.y = t/800;
    window.requestAnimationFrame(animate, renderer.domElement);
}

var light = new THREE.SpotLight();
light.position.set(170,330,-160);
scene.add(light);

var litCube = new THREE.Mesh(
    new THREE.CubeGeometry(50,50,50),
    new THREE.MeshLambertMaterial({color: 0xFFFFFF}));
litCube.position.y = 50;
scene.add(litCube);

renderer.shadowMapEnabled = true;

light.castShadow = true;

litCube.castShadow = true;
litCube.receiveShadow = true;

var planeGeo = new THREE.PlaneGeometry(400,200,10,10);
var planeMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
var plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI/2;
plane.position.y = -25;
plane.receiveShadow = true;
scene.add(plane);

animate(new Date().getTime());
document.body.appendChild(renderer.domElement);