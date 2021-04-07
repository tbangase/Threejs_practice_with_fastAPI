import * as THREE from 'three'; 
import 'stats';
import * as dat from 'dat.gui';

var camera: THREE.PerspectiveCamera;
var scene: THREE.Scene;
var renderer: THREE.WebGLRenderer;
var stats: Stats;

function init() {
  stats = initStats();

  // Create Scene
  scene = new THREE.Scene();

  // Setting Camera 
  camera = new THREE.PerspectiveCamera(
    45, //fov
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000, // far
  )

  // Get canvas element and Setting Renderer
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#canvas');
  renderer = new THREE.WebGLRenderer({canvas, alpha: true});

  // If you do not have canvas element, just write below and cf.1
  // renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.shadowMap.enabled = true;
  //renderer.setClearColor(new THREE.Color(0xEEEEEE));

  // Create objects
  /// create ground plane
  var planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  //position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  // Setting camera position and look direction
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // cf.1 
  // document.getElementById("WebGL-output").appendChild(renderer.domElement);

  // call the render function
  var step = 0;

  var controls = new function () {
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;

    this.removeCube = function () {
      var allChildren = scene.children;
      var lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length
      }
    };

    this.removeAllCubes = function () {
      var allChildren = scene.children;
      for (let index = allChildren.length - 1; index >= 0; index--) {
        var child = allChildren[index];
        if (child instanceof THREE.Mesh && child != plane) {
          scene.remove(child);
        }
      }
      this.numberOfObjects = scene.children.length;
    }

    this.addCube = function () {
      var cubeSize = Math.ceil((Math.random() * 3)); //random in 0 to 3
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = "cube-" + scene.children.length;

      // position cube

      cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width)); 
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);

      scene.add(cube);
      this.numberOfObjects = scene.children.length;

    };

    this.addCubeNum = 10;

    this.addCubes = function () {
      for (let num = 0; num < this.addCubeNum; num++) {
        var cubeSize = Math.ceil((Math.random() * 3)); //random in 0 to 3
        var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.name = "cube-" + scene.children.length;

        // position cube

        cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width)); 
        cube.position.y = Math.round(Math.random() * 20);
        cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);

        scene.add(cube);
      }
      this.numberOfObjects = scene.children.length;
    }

    this.outputObjects = function () {
      console.log(scene.children);
    };
  }

  var gui = new dat.GUI({autoPlace: false});
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'addCubeNum', 2, 100);
  gui.add(controls, 'addCubes');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'removeAllCubes');
  gui.add(controls, 'outputObjects');
  gui.add(controls, 'numberOfObjects').listen();

  var guiContainer = document.getElementById('GUI-Container');
  guiContainer.appendChild(gui.domElement);

  render();

  function render() {
    stats.update();

    scene.traverse(function (element) {
      if (element instanceof THREE.Mesh && element != plane) {
        element.rotation.x += controls.rotationSpeed;
        element.rotation.y += controls.rotationSpeed;
        element.rotation.z += controls.rotationSpeed;
      }
    });

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function initStats() {
    stats = new Stats();

    stats.showPanel(0);
    stats.dom.style.position = 'absolute';
    stats.dom.style.left = '0px';
    stats.dom.style.top = '80px';

    document.getElementById("Stats-output").appendChild(stats.dom);

    return stats;
  }
}


window.onload = init;
window.addEventListener('resize', onResize, false);
window.addEventListener('wheel', zoomCamera, false);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function zoomCamera(event: WheelEvent) {
  camera.position.x += - event.deltaY / 500 * 3;
  camera.position.y += event.deltaY / 500 * 4;
  camera.position.z += event.deltaY / 500 * 3;
}