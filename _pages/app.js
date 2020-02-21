
function init() {

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight , 0.1 , 1000);

var renderer  = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0xEEEEEE));


renderer.setSize(window.innerWidth,window.innerHeight);

var axes = new THREE.AxesHelper(20);

scene.add(axes);


var spotLight  = new THREE.SpotLight(0xffffff);
spotLight.position.set( -40,60,-10);
spotLight.castShadow = true;
scene.add(spotLight);

var planeGeometry = new THREE.PlaneGeometry(60,20);
var planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(15,0,0);
plane.receiveShadow = true;
scene.add(plane);

var cubeGeometry = new THREE.BoxGeometry(4,4,4);
var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
cube.castShadow=true;
scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4,20,20);
var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});

var sphere = new THREE.Mesh (sphereGeometry,sphereMaterial);
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow = true;
scene.add(sphere);





camera.position.set(-30,10,30);
camera.lookAt(scene.position);

// window.document.body.appendChild(renderer.domElement);

window.document.getElementById("erdibaba")
.appendChild(renderer.domElement);





renderer.setClearColor(new THREE.Color('skyblue'));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMapEnabled = true;


function initStats() {

    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Static").appendChild(stats.domElement);
    return stats;
    


}


window.addEventListener('resize',onResize,false);

function onResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
var controls = new function() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
}

var gui = new dat.GUI();
gui.add(controls,'rotationSpeed',0,0.5);
gui.add(controls,'bouncingSpeed',0,0.5);





var stats = initStats();
var step = 0;
function renderScene() {

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;
    step +=controls.bouncingSpeed;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
    stats.update();
    requestAnimationFrame (renderScene);
    renderer.render(scene,camera);


}



renderScene();










}

window.onload = init;