import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

(async () => {
  const loadModel = async () => {
    const loader = new GLTFLoader();
    const model = await new Promise((resolve) =>
      loader.load(
        "./ennchuBaoundingBox.glb",
        (object) => resolve(object.scene),
        undefined,
        (error) => console.log(error)
      )
    );
    model.traverse((node) => {
      node.castShadow = true;
      node.receiveShadow = true;
    });
    model.scale.set(50, 50, 50);
    return model;
  };

  const scene = new THREE.Scene();
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshLambertMaterial({ color: 0x0096d6, side: THREE.DoubleSide })
  );
  plane.position.set(0, -0.1, 0);
  plane.rotation.x = -0.5 * Math.PI;
  scene.add(plane);

  const loadedModel = await loadModel();
  scene.add(loadedModel);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 50, 100);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040, 0.9);
  scene.add(ambient);

  const camera = new THREE.PerspectiveCamera(45, 500 / 500, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  const gridHelper = new THREE.GridHelper(450, 20);
  scene.add(gridHelper);
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);
  const lightHelper = new THREE.DirectionalLightHelper(light, 20);
  scene.add(lightHelper);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(500, 500);
  renderer.setClearColor(0xcfcfcf);
  renderer.setPixelRatio(window.devicePixelRatio);
  stage.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;

  renderer.shadowMap.enabled = true;
  light.castShadow = true;
  light.shadow.camera.left = -200;
  light.shadow.camera.right = 200;
  light.shadow.camera.top = 200;
  light.shadow.camera.bottom = -200;
  const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(shadowHelper);
  plane.receiveShadow = true;

  const render = () => {
    requestAnimationFrame(render);
    controls.update();
    loadedModel.rotation.x += 0.01;
    loadedModel.rotation.y += 0.01;
    loadedModel.rotation.z += 0.01;
    renderer.render(scene, camera);
  };
  render();
})();
