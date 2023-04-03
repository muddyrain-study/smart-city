import * as THREE from "three";
import vertexShader from "@/shader/lightWall/vertexShader.glsl";
import fragmentShader from "@/shader/lightWall/fragmentShader.glsl";
import { gsap } from "gsap";
export default class LightWall {
  constructor() {
    this.geometry = new THREE.CylinderGeometry(5, 5, 5, 32, 1, true);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uHeight: {
          value: 0,
        },
      },
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 1, 0);
    this.mesh.scale.set(0, 0.5, 0);
    // 先计算建筑模型
    this.mesh.geometry.computeBoundingBox();
    // 再获取模型属性
    const { max, min } = this.mesh.geometry.boundingBox;
    // 获取物体的高度差
    let uHeight = max.y - min.y;
    this.material.uniforms.uHeight = {
      value: uHeight,
    };

    // 光墙的动画
    gsap.to(this.mesh.scale, {
      x: 2,
      z: 2,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
  }
}
