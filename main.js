import * as THREE from 'three'; // Three.jsライブラリをインポートします。

// Creating cubes with Three.js
(() => {
  let scene;
  let person;
  let head;
  let body;
  let light;
  let ambient;
  let camera;
  let gridHelper;
  let lightHelper;
  let axesHelper;
  let renderer;
  const width = 500;
  const height = 500;

  scene = new THREE.Scene()

  head = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  head.position.set(0, 40, 0);
  body = new THREE.Mesh(
    new THREE.BoxGeometry(40, 60, 40),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  body.position.set(0, 0, 0);
  person = new THREE.Group();
  person.add(head);
  person.add(body);
  scene.add(person);

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 30);
  scene.add(light);

  ambient = new THREE.AmbientLight(0x404040, 0.9);
  scene.add(ambient);

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  gridHelper = new THREE.GridHelper(200);
  scene.add(gridHelper);
  axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);
  lightHelper = new THREE.DirectionalLightHelper(light, 20);
  scene.add(lightHelper);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xcfcfcf);
  renderer.setPixelRatio(window.devicePixelRatio);
  stage.appendChild(renderer.domElement);

  const render = () => {
    requestAnimationFrame(render);

    person.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  render();
})();
