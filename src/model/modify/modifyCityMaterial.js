import * as THREE from "three";
export default function modifycityMaterial(mesh) {
  // 先计算建筑模型
  mesh.geometry.computeBoundingBox();
  // 再获取模型属性
  const { max, min } = mesh.geometry.boundingBox;
  // 获取物体的高度差
  let uHeight = max.y - min.y;
  console.log(uHeight);
  mesh.material.onBeforeCompile = (shader) => {
    console.log(shader.vertexShader);
    console.log(shader.fragmentShader);
    shader.uniforms.uTopColor = {
      value: new THREE.Color("#aaaeff"),
    };
    shader.uniforms.uHeight = {
      value: uHeight,
    };

    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `
      #include <common>
      varying vec3 vPosition;
    `
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>
      vPosition = position;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `
        #include <common>
        varying vec3 vPosition;
        uniform vec3 uTopColor;
        uniform float uHeight;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
      #include <dithering_fragment>
      vec4 distGradColor = gl_FragColor;

      // 混合的 百分比
      float gradMix = (vPosition.y + uHeight / 2.0) / uHeight;
      // 计算混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
      gl_FragColor = vec4(gradMixColor, 1);
      `
    );
  };
}
