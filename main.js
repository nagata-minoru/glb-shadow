import * as THREE from 'three'; // Three.jsライブラリをインポートします。

// Creating cubes with Three.js
(() => {
  let scene;
  let box;
  let light;
  let ambient;
  let camera;
  let gridHelper;
  let lightHelper;
  let axesHelper;
  let renderer;
  const width = 500;
  const height = 500;
  let theta = 0;

  scene = new THREE.Scene()

  box = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  box.position.set(0, 0, 0);
  scene.add(box);

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

    renderer.render(scene, camera);
  };
  render();
})();
