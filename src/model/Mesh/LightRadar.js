import * as THREE from "three";
import vertexShader from "@/shader/lightRadar/vertexShader.glsl";
import fragmentShader from "@/shader/lightRadar/fragmentShader.glsl";
import { gsap } from "gsap";
export default class LightRadar {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: {
          value: new THREE.Color("#ff0000"),
        },
        uTime: {
          value: 0,
        },
      },
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(-8, 1, 8);
    this.mesh.rotation.x = -Math.PI / 2;

    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      repeat: -1,
      duration: 1,
      ease: "none",
    });
  }
}
