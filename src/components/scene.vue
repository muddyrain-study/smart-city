<script setup>
import { onMounted, ref, watch } from "vue";
import * as THREE from "three";
import gsap from "gsap";

import AlarmSprite from "@/model/Mesh/AlarmSprite";
import scene from "@/model/scene";
import "@/model/init";
import camera from "@/model/camera";
import renderer from "@/model/renderer";
import axesHelper from "@/model/axesHelper";
import animate from "@/model/animate";
import createMesh from "@/model/createMesh";
import FlyLineShader from "@/model/Mesh/FlyLineShader";
import LightRadar from "@/model/Mesh/LightRadar";
import LightWall from "@/model/Mesh/LightWall";
import eventHub from "@/utils/eventHub";

// 场景元素
const sceneDiv = ref(null);

// 场景添加相机
scene.add(camera);
// 添加辅助坐标轴
scene.add(axesHelper);

const props = defineProps(["eventList"]);

createMesh();

onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  animate();
});

let mapFn = {
  火警: (position, i) => {
    const lightWall = new LightWall(1, 2, position);
    lightWall.eventListIndex = i;
    scene.add(lightWall.mesh);
    eventListMesh.push(lightWall);
  },
  治安: (position, i) => {
    //   生成随机颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex();
    // 添加着色器飞线
    const flyLineShader = new FlyLineShader(position, color);
    flyLineShader.eventListIndex = i;
    scene.add(flyLineShader.mesh);
    eventListMesh.push(flyLineShader);
  },
  电力: (position, i) => {
    // 添加雷达
    const lightRadar = new LightRadar(2, position);
    lightRadar.eventListIndex = i;
    scene.add(lightRadar.mesh);
    eventListMesh.push(lightRadar);
  },
};

let eventListMesh = [];
function watchPointer(mesh) {
  // 创建射线
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const handleMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(spriteMesh);
    if (intersects.length > 0) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  };
  window.addEventListener("mousemove", handleMove, false);
}
let spriteMesh = [];
watch(
  () => props.eventList,
  (value) => {
    eventListMesh.forEach((item) => {
      item.remove();
    });
    eventListMesh = [];
    spriteMesh = [];
    // 创建物体
    props.eventList.forEach((item, i) => {
      const position = {
        x: item.position.x / 5 - 10,
        z: item.position.y / 5 - 10,
      };
      const alarmSprite = new AlarmSprite(item.name, position);
      alarmSprite.onClick(() => {
        eventHub.emit("spriteClick", { event: item, i });
      });
      alarmSprite.eventListIndex = i;
      scene.add(alarmSprite.mesh);
      eventListMesh.push(alarmSprite);
      scene.add(alarmSprite.mesh);
      spriteMesh.push(alarmSprite.mesh);
      if (mapFn[item.name]) {
        mapFn[item.name](position, i);
      }
    });
    watchPointer();
  }
);
</script>
<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<style lang="less">
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
