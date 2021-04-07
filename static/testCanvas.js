import * as THREE from '/static/three.js-master/build/three.module.js';
import { GLTFLoader } from '/static/three.js-master/examples/jsm/loaders/GLTFLoader.js';

//Setting Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75,
    window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(0,0,5)

//Setting Renderer
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.autoClearColor = false;

//If you wanna add in js code, use following code.
//document.body.appendChild( renderer.domElement );
//document.getElementById('canvas').appendChild(renderer.domElement);

//Adding light
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//Adding test Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x99ffcc } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//Adding glTF model
const loader = new GLTFLoader();
const url = '/static/files/testBox.glb';

loader.load( url, function ( gltf ) {
    var model = gltf.scene;
    model.name = "test box"
    model.scale.set(0.015, 0.015, 0.015);
    model.position.set(-1.5,-1.3,3);
    model.traverse((object) => {
        if(object.isMesh) {
            object.material.transparent = true;
            object.material.opacity = 0.5;
        }
    });
    scene.add( gltf.scene );

    /* Animation of glTF model
    function animate() {
        requestAnimationFrame( animate );
        //model.rotation.x += 0.02;
        //model.rotation.y += 0.02;
        
        renderer.render( scene, camera );
    }
    animate();
    */

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

}, function ( error ) {
    console.error( error );
})

//Animate Cube
function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    //cube.rotation.z += 0.01;

	renderer.render( scene, camera );
}
animate();