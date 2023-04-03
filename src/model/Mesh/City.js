import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "../scene";
import modifycityMaterial from "../modify/modifyCityMaterial";
import FlyLine from "./FlyLine";

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
      }
    });
    scene.add(gltf.scene);
    // 添加飞线
    const flyLine = new FlyLine();
    scene.add(flyLine.mesh);
  });
}
