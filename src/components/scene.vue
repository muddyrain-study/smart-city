<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import gsap from "gsap";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import scene from "@/model/scene";
import "@/model/init";
import camera from "@/model/camera";
import renderer from "@/model/renderer";
import axesHelper from "@/model/axesHelper";
import controls from "@/model/controls";

// 场景元素
const sceneDiv = ref(null);

scene.add(camera);

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial()
);
plane.position.set(0, 0, -6);
plane.receiveShadow = true;
scene.add(plane);

scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();
onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  render();
});
function render() {
  let time = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
}
</script>
<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<style lang="less" scoped>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
