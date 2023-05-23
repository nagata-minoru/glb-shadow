import * as THREE from 'three'; // Three.jsライブラリをインポートします。
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Creating cubes with Three.js
(() => {
  let scene;
  let box;
  let sphere;
  let plane;
  let light;
  let ambient;
  let camera;
  let gridHelper;
  let lightHelper;
  let axesHelper;
  let renderer;
  const width = 500;
  const height = 500;
  let controls;

  scene = new THREE.Scene()

  box = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  box.position.set(0, 0, 0);
  scene.add(box);

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(50),
    new THREE.MeshLambertMaterial({ color: 0x4caf50 })
  );
  sphere.position.set(100, 0, 0);
  scene.add(sphere);

  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshLambertMaterial({ color: 0x0096d6, side: THREE.DoubleSide })
  );
  plane.position.set(0, -50, 0);
  plane.rotation.x = -0.5 * Math.PI;
  scene.add(plane);

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 30);
  scene.add(light);

  ambient = new THREE.AmbientLight(0x404040, 0.9);
  scene.add(ambient);

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  gridHelper = new THREE.GridHelper(350, 20);
  scene.add(gridHelper);
  axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);
  lightHelper = new THREE.DirectionalLightHelper(light, 20);
  scene.add(lightHelper);

  controls = new OrbitControls(camera, stage);
  controls.autoRotate = true;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xcfcfcf);
  renderer.setPixelRatio(window.devicePixelRatio);
  stage.appendChild(renderer.domElement);

  const render = () => {
    requestAnimationFrame(render);

    controls.update();
    box.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  render();
})();
