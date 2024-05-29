import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
  experience;
  sizes;
  scene;
  canvas;
  instance;
  controls;

  constructor(experience) {
    this.experience = experience;

    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setOrbitControls();
  }

  // Set Camera Instance, in the scene.
  setInstance() {
    const camera = new THREE.PerspectiveCamera(25, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance = camera;

    this.instance.position.set(1.5, 0, 7);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(
      this.instance, // the Camera
      this.canvas
    );
    this.controls.enableDamping = true;
    this.controls.enabled = false;
  }

  resize() {
    // Update the Camera aspect ratio and projection matrix (will be called by 'Experience' object)
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
