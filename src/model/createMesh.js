import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "./scene";
import createCity from "./Mesh/City";

export default function createMesh() {
  createCity();
}
