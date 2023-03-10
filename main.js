import './style.css';
import * as THREE from 'three';
import { GridHelper } from 'three';

import{MapControls, OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(10,3,16,100) 
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const TorusKnotGeometry = new THREE.Mesh(geometry, material);

scene.add(TorusKnotGeometry)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)








const orbit_controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff}) 
  const star = new THREE.Mesh(geometry, material)
  
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x, y, z);
  scene.add(star)
  
}

Array(250).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('/images/space.jpg');
scene.background = spaceTexture;

const antonTexture = new THREE.TextureLoader().load('/images/me.jpg');

const anton = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map:antonTexture})
);

const moonTexture = new THREE.TextureLoader().load('/images/moon.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map:moonTexture,
    normalMap: moonTexture
  })
);

moon.position.z = 30;
moon.position.setX(-10);


scene.add(moon);
scene.add(anton)

function animate () {
  requestAnimationFrame(animate);
  
  TorusKnotGeometry.rotation.x +=0.02;
  TorusKnotGeometry.rotation.y +=0.05;
  TorusKnotGeometry.rotation.z +=0.01;
  
  orbit_controls.update();
  
  renderer.render(scene,camera);
}


function moveCamera(){

const t = document.body.getBoundingClientRect().top;
moon.rotation.x +=0.05;
moon.rotation.y +=0.075;
moon.rotation.z +=0.05;

anton.rotation.y += 0.01;
anton.rotation.z += 0.01;

camera.position.z = t* -0.01;
camera.position.x = t* -0.0002;
camera.position.y = t* -0.0002;

}

document.body.onscroll = moveCamera

animate()

