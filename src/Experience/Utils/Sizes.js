import EventEmitter from './EventEmitter';

import * as THREE from 'three';

export default class Sizes extends EventEmitter {
  width;
  height;
  pixelRatio;
  resolution;

  constructor() {
    super(); // needed to avoid error

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.resolution = new THREE.Vector2(this.width * this.pixelRatio, this.height * this.pixelRatio);

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.resolution.set(this.width * this.pixelRatio, this.height * this.pixelRatio);


      this.trigger('resize');
    });
  }
}
