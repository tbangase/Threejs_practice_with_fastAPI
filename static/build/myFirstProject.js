import * as THREE from '../node_modules/three/build/three.module.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';
import * as dat from '../node_modules/dat.gui/build/dat.gui.module.js';
//import * as THREE from '../node_modules/three/build/three.module.js';
//import * as Stats from '../stats.js/build/stats.js';
//import { GLTFLoader } from '../..//static/three.js-master/examples/jsm/loaders/GLTFLoader.js';
var camera;
var scene;
var renderer;
function init() {
    var stats = initStats();
    //Setting Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    //camera.position.set(0,0,5);
    //Get canvas element and Setting Renderer
    const canvas = document.querySelector('#canvas');
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.shadowMap.enabled = true;
    //renderer.autoClearColor = false;
    //Show Axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
    //Create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    //Create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);
    //Create a sphere 
    var sphereGeometry = new THREE.SphereGeometry(4, 40, 40);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    scene.add(sphere);
    // position camera and set direction to center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    //Add spotlight for the shadows
    var spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(-40, 60, -10);
    spotlight.castShadow = true;
    scene.add(spotlight);
    var step = 0;
    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    };
    var gui = new dat.GUI({ autoPlace: false });
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);
    var guiContainer = document.getElementById('GUI-Container');
    guiContainer.appendChild(gui.domElement);
    renderScene();
    function renderScene() {
        stats.update();
        // setting rotate animation to cube
        var speed = controls.rotationSpeed;
        cube.rotation.x += speed;
        cube.rotation.y += speed;
        cube.rotation.z += speed;
        // setting bouncing animation to sphere
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }
    function initStats() {
        var stats = new Stats();
        //stats.setMode(0); // 0: fps, 1: ms
        stats.showPanel(0);
        // Align top-left
        stats.dom.style.position = 'absolute';
        stats.dom.style.left = '0px';
        stats.dom.style.top = '80px';
        document.getElementById("Stats-output").appendChild(stats.dom);
        return stats;
    }
}
window.onload = init;
window.addEventListener('resize', onResize, false);
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//# sourceMappingURL=myFirstProject.js.map