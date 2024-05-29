import * as THREE from 'three';
import Experience from './Experience.js';

export default class Renderer {
  experience;
  canvas;
  sizes;
  scene;
  camera;
  instance;

  constructor(experience) {
    this.experience = experience;
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.instance.physicalCorrectLights = true;
    // this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = false;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  };


  update() {
    this.instance.render(this.scene, this.camera.instance);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

} 
