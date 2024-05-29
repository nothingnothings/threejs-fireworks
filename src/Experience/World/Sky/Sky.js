import { Sky as SkyObject } from 'three/examples/jsm/objects/Sky.js';

import * as THREE from 'three';

export default class Sky {
  experience;
  scene;
  debug;
  uniforms;
  sky;
  sun;

  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.uniforms = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.95,
      elevation: -2.2,
      azimuth: 200,
      exposure: 0.0
    };

    this.debug = this.experience.debug;

    this.createSky();

    if (this.debug.active) {
      this.setDebug();
    }

  }

  createSky() {
    this.sky = new SkyObject();
    this.sky.scale.setScalar(450000);
    this.scene.add(this.sky);

    const sun = new THREE.Vector3();
    this.sun = sun;

    this.updateSky(this.sky, this.sun);
  }

  updateSky(sky, sun) {
    const uniforms = this.sky.material.uniforms;
    uniforms['turbidity'].value = this.uniforms.turbidity;
    uniforms['rayleigh'].value = this.uniforms.rayleigh;
    uniforms['mieCoefficient'].value = this.uniforms.mieCoefficient;
    uniforms['mieDirectionalG'].value = this.uniforms.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - this.uniforms.elevation);
    const theta = THREE.MathUtils.degToRad(this.uniforms.azimuth);

    this.sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(this.sun);

    this.experience.renderer.toneMappingExposure = this.uniforms.exposure;

    this.experience.renderer.update(this.scene, this.experience.camera);
  }

  setDebug() {
    this.debug.gui
      .add(this.uniforms, 'turbidity', 0.0, 20.0, 0.1)
      .onChange(() => {
        this.updateSky(this.sky, this.sun);
      });
    this.debug.gui
      .add(this.uniforms, 'rayleigh', 0.0, 4, 0.001)
      .onChange(() => {
        this.updateSky(this.sky, this.sun);
      });
    this.debug.gui
      .add(this.uniforms, 'mieCoefficient', 0.0, 0.1, 0.001)
      .onChange(() => {
        this.updateSky(this.sky, this.sun);
      });
    this.debug.gui
      .add(this.uniforms, 'mieDirectionalG', 0.0, 1, 0.001)
      .onChange(() => {
        this.updateSky(this.sky, this.sun);
      });
    this.debug.gui
      .add(this.uniforms, 'elevation', -10, 10, 0.1)
      .onChange(() => {
        this.updateSky(this.sky, this.sun);
      });
    this.debug.gui
      .add(this.uniforms, 'azimuth', -300, 300, 0.1)
      .onChange(() => {
        this.updateSky(this.sky, this.sun);
      });
  }
}
