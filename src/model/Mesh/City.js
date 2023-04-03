import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "../scene";
import modifycityMaterial from "../modify/modifyCityMaterial";
import FlyLine from "./FlyLine";
import FlyLineShader from "./FlyLineShader";
import MeshLine from "./meshLine";

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/city.glb", (gltf) => {
    gltf.scene.traverse((item) => {
      if (item.type === "Mesh") {
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e6f),
        });
        item.material = cityMaterial;
        modifycityMaterial(item);
        if (item.name === "Layerbuildings") {
          const meshLine = new MeshLine(item.geometry);
          const size = item.scale.x * 1.01;
          meshLine.mesh.scale.set(size, size, size);
          scene.add(meshLine.mesh);
        }
      }
    });
    scene.add(gltf.scene);
    // 添加飞线
    const flyLine = new FlyLine();
    scene.add(flyLine.mesh);

    // 添加装饰器飞线
    const flyLineShader = new FlyLineShader();
    scene.add(flyLineShader.mesh);
  });
}
