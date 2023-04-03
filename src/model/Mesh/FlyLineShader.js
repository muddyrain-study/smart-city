import * as THREE from "three";
import gsap from "gsap";
import vertexShader from "@/shader/flyLine/vertexShader.glsl";
import fragmentShader from "@/shader/flyLine/fragmentShader.glsl";
export default class FlyLineShader {
  constructor() {
    // 根据点生成曲线
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-5, 4, 0),
      new THREE.Vector3(-10, 0, 0),
    ];
    // 创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    // 根据曲线去生成 管道几何体
    const points = this.lineCurve.getPoints(1000);
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);

    // 设置着色器材质
    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial);
  }
}
